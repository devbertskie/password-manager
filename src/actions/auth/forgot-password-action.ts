'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import { sendForgotPasswordVerification } from '@/lib/mail';
import { forgotPasswordSchema } from '@/lib/schema';
import {
  generatePasswordToken,
  isTokenExpire,
  updateForgotPasswordToken,
} from '@/lib/token';
import {
  deleteForgotPasswordVerificationById,
  fetchForgotPasswordVerificationByEmail,
} from '@/query';
import { FormState } from '@/types';
import { PasswordVerification } from '@prisma/client';
import {} from 'resend';

const CHANGE_PASSWORD_LIMIT_ATTEMPT = process.env.VERIFICATION_LIMIT_ATTEMPTS;

export const forgotPassword = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    let generatedToken: PasswordVerification;
    const forgotPasswordFieldValidation = forgotPasswordSchema.safeParse(
      Object.fromEntries(formData),
    );
    if (!forgotPasswordFieldValidation.success) {
      return fromErrorsToFormState(forgotPasswordFieldValidation.error);
    }

    const { email } = forgotPasswordFieldValidation.data;

    const existingUser = await db.user.findFirst({ where: { email } });
    if (!existingUser) return toFormState('ERROR', 'Email not found!');

    // check if there is available token
    const existingToken = await fetchForgotPasswordVerificationByEmail(
      existingUser.email,
    );
    // if there is token
    if (existingToken && CHANGE_PASSWORD_LIMIT_ATTEMPT) {
      const isExpire = isTokenExpire(existingToken);
      if (isExpire && existingToken.attempt < +CHANGE_PASSWORD_LIMIT_ATTEMPT) {
        generatedToken = await updateForgotPasswordToken(existingToken);
        if (generatedToken) {
          // send email with token
          const { error } =
            await sendForgotPasswordVerification(generatedToken);
          if (error) {
            await deleteForgotPasswordVerificationById(generatedToken.id);
          }
          return toFormState(
            'SUCCESS',
            'New Reset password confirmation sent!',
          );
        }
      } else {
        return toFormState('ERROR', 'Login Attempts Lmit Error');
      }
    }

    // if theres no existing token
    // generate token
    const generatedPasswordVerificationToken =
      await generatePasswordToken(email);

    if (!generatedPasswordVerificationToken) {
      return toFormState('ERROR', 'Something went wrong: Token');
    }

    // send email with token
    const { error } = await sendForgotPasswordVerification(
      generatedPasswordVerificationToken,
    );
    if (error) {
      await deleteForgotPasswordVerificationById(
        generatedPasswordVerificationToken.id,
      );
      return toFormState('ERROR', 'Verification Link Error');
    }
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  return toFormState('SUCCESS', 'Reset Password Link sent');
};

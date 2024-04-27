'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { resetPasswordSchema } from '@/lib/schema';
import { isTokenExpire } from '@/lib/token';
import {
  deleteForgotPasswordVerificationById,
  fetchForgotPasswordVerificationByToken,
} from '@/query';
import { FormState } from '@/types';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';

export const resetPassword = async (
  token: string,
  formState: FormState,
  formData: FormData,
) => {
  try {
    if (!token) {
      return toFormState('ERROR', 'Token not found');
    }
    const resetPasswordValidationField = resetPasswordSchema.safeParse(
      Object.fromEntries(formData),
    );
    if (!resetPasswordValidationField.success) {
      return fromErrorsToFormState(resetPasswordValidationField.error);
    }

    const existingToken = await fetchForgotPasswordVerificationByToken(token);
    if (!existingToken) {
      return toFormState('ERROR', 'Token not found');
    }
    const isExpire = isTokenExpire(existingToken);
    if (isExpire) {
      return toFormState('ERROR', 'Token Expire');
    }

    const { newPassword } = resetPasswordValidationField.data;
    const hashedPassword = await hash(newPassword, 10);
    const updatedUser = await db.user.update({
      where: { email: existingToken.email },
      data: {
        password: hashedPassword,
      },
    });
    // delete the token
    if (updatedUser) {
      await deleteForgotPasswordVerificationById(existingToken.id);
    }
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  setFlash({
    type: 'SUCCESS',
    message: 'Password reset successfull',
    timestamp: Date.now(),
  });
  redirect(paths.toLogin());
};

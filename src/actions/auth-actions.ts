'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';

import { toFormState } from '@/helpers/to-form-state';
import { signIn, signOut } from '@/auth';
import { formLoginSchema, formRegisterSchema } from '@/lib/schema';
import { FormState } from '@/types';
import { hash } from 'bcrypt';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import paths from '@/lib/paths';
import { routes } from '@/lib/routes';
import { setFlash } from '@/components/shared/feedback';
import {
  generateVerificationToken,
  isTokenExpire,
  updateToken,
} from '@/lib/token';
import { sendEmailverification } from '@/lib/mail';
import {
  deleteEmailVerificationById,
  fetchEmailVerificationByEmail,
  fetchEmailVerificationByToken,
} from '@/query';

export const registerUser = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const schemaData = formRegisterSchema.safeParse(
      Object.fromEntries(formData),
    );

    if (!schemaData.success) {
      return fromErrorsToFormState(schemaData.error);
    }
    const { username, email, password } = schemaData.data;
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return toFormState('ERROR', 'Username/Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const createdUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!createdUser) {
      return toFormState('ERROR', "There's a probles creating you account");
    }

    const generatedToken = await generateVerificationToken(createdUser.email);
    // send to email
    const { error } = await sendEmailverification(generatedToken);
    if (error) {
      // if there is error sending the token: FALLBACK
      // delete the current token
      await deleteEmailVerificationById(generatedToken.id);
      // delete the user
      await db.user.delete({
        where: { id: createdUser.id },
      });
      return toFormState('ERROR', 'Something went wrong. Sending the token');
    }
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  setFlash({
    type: 'SUCCESS',
    message: 'Account created🎉 Email sent for verification!',
    timestamp: Date.now(),
  });
  redirect(paths.toLogin());
};

export const authorizeUser = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const schemaData = formLoginSchema.safeParse(Object.fromEntries(formData));
    const verificationLimitAttempts = process.env.VERIFICATION_LIMIT_ATTEMPTS;

    if (!schemaData.success) {
      return fromErrorsToFormState(schemaData.error);
    }

    const { email, password } = schemaData.data;

    const existingToken = await fetchEmailVerificationByEmail(email);
    if (existingToken && verificationLimitAttempts) {
      const isExpire = isTokenExpire(existingToken);

      /**
       * send another verification email:
       * IF -> the TOKEN is expire and verification limit attempts is less than the required limit attempts
       * ELSE -> unverified user cannot login and no verification email will be sent again unless manually verified by admin
       *  */

      if (isExpire && existingToken.attempt < +verificationLimitAttempts) {
        const updatedExisitingToken = await updateToken(existingToken);

        if (updatedExisitingToken) {
          const { error } = await sendEmailverification(updatedExisitingToken);
          if (error) {
            return toFormState('ERROR', 'Unable to sent verification token');
          }
          return toFormState(
            'SUCCESS',
            'A new verification token has been sent',
          );
        }
      }
    }
    await signIn('credentials', {
      email,
      password,
      redirectTo: routes.defaultRedirect,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return fromErrorsToFormState(error);
  }
  return formState;
};

export const signOutUser = async () => {
  setFlash({
    type: 'SUCCESS',
    message: 'Logout successfully',
    timestamp: Date.now(),
  });
  await signOut({
    redirectTo: paths.toLogin(),
  });
};

export const verifyUserEmail = async (token: string, formState: FormState) => {
  try {
    if (!token) {
      return toFormState('ERROR', 'No token found');
    }
    const existingToken = await fetchEmailVerificationByToken(token);
    if (!existingToken) {
      return toFormState('ERROR', 'Invalid token: No token found');
    }
    const isExpire = isTokenExpire(existingToken);
    if (isExpire) {
      return toFormState('ERROR', 'Invalid token expire.');
    }

    // update the user emailverified
    const updatedUser = await db.user.update({
      where: { email: existingToken.email },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    if (!updatedUser) {
      return toFormState('ERROR', 'Unknow error occured: Cannot verify user');
    }
    // delete the verified token
    await deleteEmailVerificationById(existingToken.id);
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  return toFormState('SUCCESS', 'Email verified. Please login');
};

'use server';

import { signIn } from '@/auth';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import { sendEmailVerification } from '@/lib/mail';
import { routes } from '@/lib/routes';
import { formLoginSchema } from '@/lib/schema';
import { isTokenExpire, updateToken } from '@/lib/token';
import { fetchEmailVerificationByEmail } from '@/query';
import { FormState } from '@/types';
import { isRedirectError } from 'next/dist/client/components/redirect';

export const authorizeUser = async (
  callbackUrl: string | null,
  formState: FormState,
  formData: FormData,
) => {
  try {
    console.log(callbackUrl);
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
          const { error } = await sendEmailVerification(updatedExisitingToken);
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
      redirectTo: callbackUrl || routes.defaultRedirect,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return fromErrorsToFormState(error);
  }
  return formState;
};

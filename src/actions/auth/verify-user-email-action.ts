'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import { isTokenExpire } from '@/lib/token';
import {
  deleteEmailVerificationById,
  fetchEmailVerificationByToken,
} from '@/query';
import { FormState } from '@/types';

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

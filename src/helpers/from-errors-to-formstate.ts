import { FormState } from '@/types';
import { ZodError } from 'zod';
import { toFormState } from '@/helpers/to-form-state';
import { AuthError } from 'next-auth';

export const EmptyFormState: FormState = {
  status: 'UNSET' as const,
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorsToFormState = (error: unknown): FormState => {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR' as const,
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return toFormState('ERROR', 'Invalid Credentials');
      case 'AccessDenied':
        return toFormState('ERROR', 'Account not verified/disabled');
      default:
        return toFormState('ERROR', 'We cant provide access');
    }
  }

  if (error instanceof Error) {
    return toFormState('ERROR' as const, error.message);
  }
  return toFormState('ERROR' as const, 'Unknown error occured');
};

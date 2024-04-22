import { FormState } from '@/types';
import { ZodError } from 'zod';
import { toFormState } from '@/helpers/to-form-state';
import { InvalidCredentialError } from '@/lib/errors';

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

  if (error instanceof InvalidCredentialError) {
    return toFormState('ERROR' as const, 'Invalid credential/password');
  }

  if (error instanceof Error) {
    return toFormState('ERROR' as const, error.message);
  }
  return toFormState('ERROR' as const, 'Unknown error occured');
};

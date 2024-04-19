import { FormState } from '@/types';
import { ZodError } from 'zod';
import { toFormState } from '@/helpers/to-form-state';

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
  if (error instanceof Error) {
    toFormState('ERROR' as const, error.message);
  }
  return toFormState('ERROR' as const, 'Unknown error occured');
};

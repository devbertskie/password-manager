import { FormState } from '@/types';
import React from 'react';

interface FieldErrorProps {
  formState: FormState;
  name: string;
}

export default function FieldError({ formState, name }: FieldErrorProps) {
  return (
    <span className="text-xs text-destructive">
      {formState.fieldErrors[name]?.[0]}
    </span>
  );
}

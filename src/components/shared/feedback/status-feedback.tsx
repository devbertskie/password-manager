import { cn } from '@/lib/utils';
import { FormState } from '@/types';
import { CheckCircle2Icon, CircleXIcon } from 'lucide-react';
import React from 'react';

interface StatusFeedbackProps {
  formState: FormState;
}

export default function StatusFeedback({ formState }: StatusFeedbackProps) {
  if (formState.status === 'UNSET') return null;
  const isSuccess = formState.status === 'SUCCESS';
  return (
    <div
      className={cn(
        isSuccess ? 'bg-emerald-400/15' : 'bg-red-500/15',
        'flex items-center justify-center space-x-3 rounded-md  px-4 py-2',
      )}
    >
      {isSuccess ? (
        <CheckCircle2Icon className="size-6 text-emerald-400" />
      ) : (
        <CircleXIcon className="size-6 text-red-400" />
      )}

      <h3
        className={cn(
          isSuccess ? 'text-emerald-400' : 'text-red-400',
          'font-space text-sm  md:text-lg',
        )}
      >
        {isSuccess ? 'Confirmation success!' : 'Confirmation error!'}
      </h3>
    </div>
  );
}

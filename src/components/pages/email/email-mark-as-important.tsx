import React from 'react';
import { markEmailAsImportant } from '@/actions';
import { Button } from '@/components/ui/button';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import { cn } from '@/lib/utils';
import { useFormState } from 'react-dom';

interface EmailMarkAsImportantProps {
  isImportant: boolean;
  credentialId: string;
}

export default function EmailMarkAsImportant({
  isImportant,
  credentialId,
}: EmailMarkAsImportantProps) {
  const [formState, dispatch] = useFormState(
    markEmailAsImportant.bind(null, credentialId),
    EmptyFormState,
  );

  useFormToastMessage(formState);

  return (
    <form action={dispatch}>
      <Button
        size="icon"
        variant="ghost"
        type="submit"
        className={cn(
          isImportant
            ? 'text-yellow-400 hover:text-yellow-400'
            : 'text-black dark:text-white',
          'hover:bg-transparent',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </form>
  );
}
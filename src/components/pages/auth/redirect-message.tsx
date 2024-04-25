'use client';
import { notify } from '@/lib/notification';
import { FormState } from '@/types';
import { useCallback, useEffect } from 'react';

interface RedirectMessageProps {
  type: FormState['status'];
  message: string;
}

export default function RedirectMessage({
  type,
  message,
}: RedirectMessageProps) {
  const flashMessage = useCallback(() => {
    if (type === 'ERROR') {
      notify.error(message);
    } else {
      notify.success(message);
    }
  }, [type, message]);

  useEffect(() => {
    flashMessage();
  }, [flashMessage]);

  return null;
}

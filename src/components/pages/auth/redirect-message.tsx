'use client';
import { notify } from '@/lib/notification';
import { FormState } from '@/types';
import { useEffect } from 'react';

interface RedirectMessageProps {
  type: FormState['status'];
  message: string;
}

export default function RedirectMessage({
  type,
  message,
}: RedirectMessageProps) {
  useEffect(() => {
    if (type === 'ERROR') {
      notify.error(message);
    } else {
      notify.success(message);
    }
  }, [message, type]);

  return null;
}

'use client';
import { notify } from '@/lib/notification';
import { FormState } from '@/types';
import { useEffect, useRef } from 'react';

const useFormToastMessage = (formState: FormState) => {
  const previousTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message && formState.timestamp !== previousTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.status === 'ERROR') {
        notify.error(formState.message);
      } else {
        notify.success(formState.message);
      }

      previousTimestamp.current = formState.timestamp;
    }
  }, [formState.message, formState.timestamp, formState.status, showToast]);
};

export { useFormToastMessage };

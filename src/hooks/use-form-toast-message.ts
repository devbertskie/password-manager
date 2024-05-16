'use client';
import { notify } from '@/lib/notification';
import { FormState } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useFormToastMessage = (formState: FormState) => {
  const previousTimestamp = useRef(formState.timestamp);
  const router = useRouter();

  const showToast =
    formState.message && formState.timestamp !== previousTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.status === 'ERROR') {
        notify.error(formState.message);
      } else {
        notify.success(formState.message);
      }

      router.refresh();
      previousTimestamp.current = formState.timestamp;
    }
  }, [
    formState.message,
    formState.timestamp,
    formState.status,
    showToast,
    router,
  ]);
};

export { useFormToastMessage };

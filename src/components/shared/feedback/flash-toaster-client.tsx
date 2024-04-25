'use client';

import { FormState } from '@/types';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export type FlashType = {
  type: FormState['status'];
  message: string;
  timestamp: number;
};

interface FlashToasterClientProps {
  flash: string | undefined;
}

export default function FlashToasterClient({ flash }: FlashToasterClientProps) {
  const previousTimestamp = useRef<number | undefined>();

  useEffect(() => {
    if (flash) {
      const { type, message, timestamp } = JSON.parse(flash) as FlashType;
      const showFlash = message && timestamp !== previousTimestamp.current;

      if (showFlash && type === 'ERROR') {
        toast.error(message);
      } else if (type === 'SUCCESS') {
        toast.success(message);
      }
      previousTimestamp.current = timestamp;
    }
  }, [flash]);
  return null;
}

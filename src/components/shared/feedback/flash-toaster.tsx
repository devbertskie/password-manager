import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import FlashToasterClient, {
  FlashType,
} from '@/components/shared/feedback/flash-toaster-client';
import { cookies } from 'next/headers';

export const FlashToaster = () => {
  const flash = cookies().get('flash');
  return (
    <>
      <Toaster richColors duration={2000} position="bottom-right" />
      <FlashToasterClient flash={flash?.value} />
    </>
  );
};

export const setFlash = (flash: FlashType) => {
  cookies().set('flash', JSON.stringify(flash), {
    path: '/',
    expires: new Date(Date.now() + 10 * 1000),
  });
};

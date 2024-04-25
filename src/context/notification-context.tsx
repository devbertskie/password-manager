import { FlashToaster } from '@/components/shared/feedback/flash-toaster';
import React, { PropsWithChildren } from 'react';

const NotificationProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <FlashToaster />

      {children}
    </>
  );
};

export default NotificationProvider;

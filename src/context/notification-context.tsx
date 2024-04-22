'use client';

import { Toaster } from '@/components/ui/sonner';
import React, { PropsWithChildren } from 'react';

const NotificationProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster richColors duration={1500} position="bottom-right" />
      {children}
    </>
  );
};

export default NotificationProvider;

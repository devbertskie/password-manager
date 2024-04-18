'use client';
import React, { PropsWithChildren } from 'react';
import App from '@/App';
import AppProvider from '@/context/app-context';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Toaster } from '@/components/ui/sonner';

const ProviderComponent = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <AppProvider>
        <EdgeStoreProvider>
          <Toaster />
          <App>{children}</App>
        </EdgeStoreProvider>
      </AppProvider>
    </SessionProvider>
  );
};

export default ProviderComponent;

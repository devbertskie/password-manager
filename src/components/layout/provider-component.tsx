'use client';
import React, { PropsWithChildren } from 'react';
import App from '@/App';
import AppProvider from '@/context/app-context';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore';

const ProviderComponent = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <AppProvider>
        <EdgeStoreProvider>
          <App>{children}</App>
        </EdgeStoreProvider>
      </AppProvider>
    </SessionProvider>
  );
};

export default ProviderComponent;

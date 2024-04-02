'use client';
import React, { PropsWithChildren } from 'react';
import App from '@/App';
import AppProvider from '@/context/app-context';
import { SessionProvider } from 'next-auth/react';

const ProviderComponent = ({ children }: PropsWithChildren) => {
  return (
    <AppProvider>
      <SessionProvider>
        <App>{children}</App>
      </SessionProvider>
    </AppProvider>
  );
};

export default ProviderComponent;

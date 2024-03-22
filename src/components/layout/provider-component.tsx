'use client';
import React, { PropsWithChildren } from 'react';
import App from '@/App';
import AppProvider from '@/context/app-context';

const ProviderComponent = ({ children }: PropsWithChildren) => {
  return (
    <AppProvider>
      <App>{children}</App>
    </AppProvider>
  );
};

export default ProviderComponent;

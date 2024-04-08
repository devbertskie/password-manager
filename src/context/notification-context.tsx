'use client';

import { SnackbarProvider } from 'notistack';
import React, { PropsWithChildren } from 'react';

const NotificationProvider = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      maxSnack={1}
      autoHideDuration={1500}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;

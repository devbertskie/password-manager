'use client';
import React, { PropsWithChildren } from 'react';
import { useApp } from './context/app-context';
import { cn } from './lib/utils';

const App = ({ children }: PropsWithChildren) => {
  const { isSidebarOpen } = useApp();
  return (
    <div
      className={cn(
        !isSidebarOpen && 'toggle-sidebar',
        'relative text-sm font-normal antialiased',
      )}
    >
      {children}
    </div>
  );
};

export default App;

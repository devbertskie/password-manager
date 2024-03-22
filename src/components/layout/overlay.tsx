'use client';
import { useApp } from '@/context/app-context';
import { cn } from '@/lib/utils';
import React from 'react';

const Overlay = () => {
  const { isSidebarOpen, toggleSidebar } = useApp();
  return (
    <div
      className={cn(
        isSidebarOpen && 'hidden',
        'bg-black/40  fixed inset-0 z-50 lg:hidden',
      )}
      onClick={() => toggleSidebar()}
    ></div>
  );
};

export default Overlay;

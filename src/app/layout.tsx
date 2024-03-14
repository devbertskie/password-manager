import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import NotificationProvider from '@/context/notification-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Password Manager',
  description: 'Secured vault for everybody!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}

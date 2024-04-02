import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Space_Grotesk as SpaceGrotesk, Lexend } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import ProviderComponent from '@/components/layout/provider-component';

export const runtime = 'edge';

const spaseGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const lexend = Lexend({
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Password Manager',
    default: 'Secure your Accounts',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(lexend.variable, spaseGrotesk.variable)}>
        <ProviderComponent>{children}</ProviderComponent>
      </body>
    </html>
  );
}

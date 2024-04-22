import MainContainer from '@/components/layout/main-container';
import Navbar from '@/components/layout/navbar';
import Overlay from '@/components/layout/overlay';
import Sidebar from '@/components/layout/sidebar';
import { auth } from '@/lib/auth';
import paths from '@/lib/paths';

import { redirect } from 'next/navigation';

import React, { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect(paths.toLogin());
  }
  return (
    <>
      <div className="relative">
        {/* overlay */}
        <Overlay />

        {/* main container */}
        <MainContainer>
          {/* sidebar */}
          <Sidebar />

          <div className="main-content flex min-h-screen w-full flex-col">
            {/* navbar */}
            <Navbar />

            {children}
          </div>
        </MainContainer>
      </div>
    </>
  );
};

export default RootLayout;

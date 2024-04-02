import MainContainer from '@/components/layout/main-container';
import Navbar from '@/components/layout/navbar';
import Overlay from '@/components/layout/overlay';
import Sidebar from '@/components/layout/sidebar';
import paths from '@/lib/paths';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import React, { PropsWithChildren } from 'react';

const RootLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();
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

import MainContainer from '@/components/layout/main-container';
import Navbar from '@/components/layout/navbar';
import Overlay from '@/components/layout/overlay';
import Sidebar from '@/components/layout/sidebar';

import React, { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
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

import React, { PropsWithChildren } from 'react';

const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="main-container flex items-center text-foreground">
      {children}
    </div>
  );
};

export default MainContainer;

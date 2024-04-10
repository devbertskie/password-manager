import React, { PropsWithChildren } from 'react';
import WebCredentialsList from './web-list';

const MainAside = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row space-x-8">
      <aside className="no-scrollbar max-h-[calc(100vh_-_21rem)] w-1/3 overflow-y-scroll border-r border-r-border">
        {/* All Web credentials List Here */}
        <WebCredentialsList />
      </aside>

      {/* display each credential when click */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default MainAside;

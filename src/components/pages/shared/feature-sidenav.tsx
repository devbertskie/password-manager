import React, { PropsWithChildren } from 'react';

export default function FeatureSidenav({ children }: PropsWithChildren) {
  return (
    <aside className="custom-scroll max-h-[calc(100vh_-_21rem)] w-2/6 overflow-y-scroll border-r border-r-border">
      {children}
    </aside>
  );
}

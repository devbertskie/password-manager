import React, { PropsWithChildren } from 'react';

export default function FeatureSidenav({ children }: PropsWithChildren) {
  return (
    <aside className="custom-scroll max-h-[calc(100vh_-_21rem)] min-w-64 overflow-x-hidden overflow-y-scroll border-r border-r-border">
      {children}
    </aside>
  );
}

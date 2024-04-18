import React, { PropsWithChildren } from 'react';

interface FeatureHeaderProps {
  title: string;
}

export default function FeatureHeader({
  title,
  children,
}: PropsWithChildren<FeatureHeaderProps>) {
  return (
    <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
      <div className="space-y-0.5 text-center md:text-left">
        <h3 className="text-xl font-bold tracking-wider md:text-2xl">
          {title}
        </h3>
        <p className="text-muted-foreground">Manage your web credentials</p>
      </div>
      {/* for modal */}
      {children}
    </div>
  );
}

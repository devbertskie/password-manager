import React, { PropsWithChildren } from 'react';

interface FeatureHeaderProps {
  title: string;
}

export default function FeatureHeader({
  title,
  children,
}: PropsWithChildren<FeatureHeaderProps>) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
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

import React, { PropsWithChildren } from 'react';

export default function FeatureItemList({ children }: PropsWithChildren) {
  return (
    <>
      {/* Desktop */}
      <ul className=" -ml-2  hidden flex-col space-y-3 text-clip pl-2 pr-4 md:flex">
        {children}
      </ul>

      {/* Mobile screen */}
      <div className="flex flex-col space-y-3 md:hidden">{children}</div>
    </>
  );
}

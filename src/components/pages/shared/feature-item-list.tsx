import React, { PropsWithChildren } from 'react';

export default function FeatureItemList({ children }: PropsWithChildren) {
  return (
    <ul className="-ml-2 flex flex-col space-y-3 pl-2 pr-4 ">{children}</ul>
  );
}

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface WebItemSkeletonProps {
  count: number;
}

const WebItemSkeleton = ({ count }: WebItemSkeletonProps) => {
  return (
    <div className="flex w-full flex-col space-y-2">
      {Array(count)
        .fill(0)
        .map((__, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-1 flex-col space-y-1 md:pr-3">
              <Skeleton className="h-2.5 w-full" />
              <Skeleton className="h-2.5 w-full" />
            </div>
          </li>
        ))}
    </div>
  );
};

export { WebItemSkeleton };

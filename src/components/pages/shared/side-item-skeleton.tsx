import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface SideItemSkeletonProps {
  count: number;
}

export default function SideItemSkeleton({ count }: SideItemSkeletonProps) {
  return (
    <div className="flex  flex-col space-y-2 md:pr-3">
      {Array.from({ length: count }).map((__, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 border px-4 py-3"
        >
          <Skeleton className="size-8 rounded-full" />
          <div className="flex min-w-64 flex-1 flex-col gap-y-2 ">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-28 md:w-20" />
          </div>
        </li>
      ))}
    </div>
  );
}

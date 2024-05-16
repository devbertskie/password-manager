import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface SideItemSkeletonProps {
  count: number;
}

export default function SideItemSkeleton({ count }: SideItemSkeletonProps) {
  return (
    <div className="flex w-full flex-col space-y-2">
      {Array.from({ length: count }).map((__, index) => (
        <li
          key={index}
          className="flex items-center space-x-2 border px-2 py-4"
        >
          <Skeleton className="size-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-y-2 md:pr-3">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-28 md:w-20" />
          </div>
        </li>
      ))}
    </div>
  );
}

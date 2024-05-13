import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MetricSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:content-start md:gap-4">
      {Array.from({ length: 3 }).map((__, index) => (
        <div
          key={index}
          className="flex items-start justify-between gap-x-4 border p-6 md:w-[300px]"
        >
          <div className="flex-1 space-y-4">
            <Skeleton className="h-2.5" />
            <Skeleton className="h-2.5" />
            <Skeleton className="h-2.5" />
          </div>
          <Skeleton className="size-6 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default MetricSkeleton;

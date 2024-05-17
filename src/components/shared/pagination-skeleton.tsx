import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PaginationSkeleton = () => {
  return (
    <CardFooter className="flex flex-row items-center justify-between border-t px-6 py-4">
      <div className="text-xs text-muted-foreground">
        <Skeleton className="h-2.5 w-20" />
      </div>
      <div className="flex items-center  gap-x-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
    </CardFooter>
  );
};

export default PaginationSkeleton;

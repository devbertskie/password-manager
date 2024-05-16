import { CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const WebPaginationSkeleton = () => {
  return (
    <CardFooter className="flex flex-row items-center justify-between border-t bg-primary/10 px-6 py-4">
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

export default WebPaginationSkeleton;

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface CredentialItemSkeletonProps {
  count?: number;
}

const CredentialItemSkeleton = ({ count = 4 }: CredentialItemSkeletonProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-2 w-20" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-2 w-20" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
      <Separator className="my-8 " />
      <div className="space-y-6">
        {Array.from({ length: count }).map((__, index) => (
          <div key={index} className="space-y-1">
            <Skeleton className="h-2 w-full max-w-16" />
            <Skeleton className="h-2 w-full max-w-60" />
            <Skeleton className="h-2 w-full  max-w-80" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CredentialItemSkeleton;

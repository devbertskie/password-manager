import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function RecentlyAddedSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent className="grid gap-4">
        {Array.from({ length: 6 }).map((__, index) => (
          <div
            key={index}
            className="group flex items-center gap-4 rounded-sm px-3 py-2"
          >
            <Skeleton className="size-10 rounded-full" />
            <div className="grid w-full gap-1">
              <Skeleton className="h-2.5 w-40" />
              <Skeleton className="h-2.5 w-24" />
            </div>
            <div className="transition-300 ml-auto flex items-center justify-between font-medium group-hover:text-primary">
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

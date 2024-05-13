import React, { Suspense } from 'react';

import MetricList from '@/components/pages/dashboard/metric-list';
import { Separator } from '@/components/ui/separator';
import MetricSkeleton from '@/components/pages/dashboard/metric-skeleton';
import RecentlyAdded from '@/components/pages/dashboard/recently-added';
import RecentlyAddedSkeleton from '@/components/pages/dashboard/recently-added-skeleton';

const DashboardPage = async () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Suspense fallback={<MetricSkeleton />}>
        <MetricList />
      </Suspense>
      <Separator className="my-2" />
      <Suspense fallback={<RecentlyAddedSkeleton />}>
        <RecentlyAdded />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

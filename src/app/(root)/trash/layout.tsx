import FeatureHeader from '@/components/pages/shared/feature-header';
import LayoutPager from '@/components/shared/layout-pager';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode } from 'react';

interface TrashLayoutLayoutProps {
  children: ReactNode;
}

const TrashLayout = ({ children }: TrashLayoutLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager />
      <div className="rounded-md border border-border p-6">
        <FeatureHeader title="Trash" label="Manage all deleted credentials">
          {/* <NoteNewForm /> */}
        </FeatureHeader>
        <Separator className="my-6" />
        <div className="flex space-x-6">{children}</div>
      </div>
    </div>
  );
};

export default TrashLayout;

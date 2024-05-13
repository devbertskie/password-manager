import LayoutPager from '@/components/shared/layout-pager';
import React, { ReactNode } from 'react';
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager />
      <div className="rounded-md border border-border p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;

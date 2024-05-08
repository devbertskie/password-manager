import FeatureHeader from '@/components/pages/shared/feature-header';
import React, { ReactNode, Suspense } from 'react';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';

import WebNewForm from '@/components/pages/web/web-new-form';
import { Separator } from '@/components/ui/separator';
import WebCredentialsList from '@/components/pages/web/web-credential-list';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import LayoutPager from '@/components/shared/layout-pager';

interface WebCredentialsRootLayoutProps {
  children: ReactNode;
}

const WebCredentialsRootLayout = ({
  children,
}: WebCredentialsRootLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager type="Web" />
      <div className="rounded-md border border-border p-6">
        <FeatureHeader
          title="Web Credentials"
          label="Manage your web credentials"
        >
          <WebNewForm />
        </FeatureHeader>
        <Separator className="my-6" />

        <div className="hidden space-x-6 md:flex">
          {/* sidenav hear */}
          <FeatureSidenav>
            <Suspense fallback={<SideItemSkeleton count={8} />}>
              <WebCredentialsList />
            </Suspense>
          </FeatureSidenav>
          <div className="flex-1">{children}</div>
        </div>
        <div className="md:hidden">{children}</div>
      </div>
    </div>
  );
};

export default WebCredentialsRootLayout;

import React, { ReactNode, Suspense } from 'react';
import FeatureHeader from '@/components/pages/shared/feature-header';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import WebNewForm from '@/components/pages/web/web-new-form';
import { Separator } from '@/components/ui/separator';
import WebCredentialsList from '@/components/pages/web/web-credential-list';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import LayoutPager from '@/components/shared/layout-pager';
import { Card, CardContent } from '@/components/ui/card';
import WebPagination from '@/components/pages/web/web-pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Logins',
};

interface WebCredentialsRootLayoutProps {
  children: ReactNode;
}

const WebCredentialsRootLayout = ({
  children,
}: WebCredentialsRootLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager type="Web" />
      <Card>
        <CardContent className="p-4">
          <FeatureHeader title="Web Logins" label="Manage your web accounts">
            <WebNewForm />
          </FeatureHeader>
          <Separator className="my-6" />

          <div className="hidden space-x-6 md:flex">
            <FeatureSidenav>
              <Suspense fallback={<SideItemSkeleton count={10} />}>
                <WebCredentialsList />
              </Suspense>
            </FeatureSidenav>
            <div className="flex-1">{children}</div>
          </div>
          <div className="md:hidden">{children}</div>
        </CardContent>
        <WebPagination />
      </Card>
    </div>
  );
};

export default WebCredentialsRootLayout;

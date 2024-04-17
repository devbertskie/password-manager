import FeatureHeader from '@/components/pages/shared/feature-header';
import React, { ReactNode, Suspense } from 'react';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import { WebItemSkeleton } from '@/components/pages/web/web-loading-skeleton';
import WebNewForm from '@/components/pages/web/web-new-form';
import { Separator } from '@/components/ui/separator';
import WebCredentialsList from '@/components/pages/web/web-list';

interface WebCredentialsRootLayoutProps {
  modal: ReactNode;
  children: ReactNode;
}

const WebCredentialsRootLayout = ({
  children,
  modal,
}: WebCredentialsRootLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 pb-16 md:p-10">
      <div className="rounded-md border border-border p-6">
        <FeatureHeader title="Web Credential">
          <WebNewForm />
        </FeatureHeader>
        <Separator className="my-6" />

        <div className="hidden space-x-6 md:flex">
          {/* sidenav hear */}
          <FeatureSidenav>
            <Suspense fallback={<WebItemSkeleton count={8} />}>
              <WebCredentialsList />
            </Suspense>
          </FeatureSidenav>
          <div className="flex-1">{children}</div>
        </div>
        {modal}
        <div className="md:hidden">{children}</div>
      </div>
    </div>
  );
};

export default WebCredentialsRootLayout;

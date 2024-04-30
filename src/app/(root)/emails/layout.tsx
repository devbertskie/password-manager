import EmailCredentialsList from '@/components/pages/email/email-credentials-list';
import FeatureHeader from '@/components/pages/shared/feature-header';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode, Suspense } from 'react';

interface EmailCredentialLayoutProps {
  // modal: ReactNode;
  children: ReactNode;
}

const EmailCredentialLayout = ({ children }: EmailCredentialLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 pb-16 md:p-10">
      <div className="rounded-md border border-border p-6">
        <FeatureHeader
          title="Email Credentials"
          label="Manage your email credentials"
        >
          {/* <WebNewForm /> */}
        </FeatureHeader>
        <Separator className="my-6" />

        <div className="hidden space-x-6 md:flex">
          {/* sidenav hear */}
          <FeatureSidenav>
            <Suspense fallback={<SideItemSkeleton count={8} />}>
              <EmailCredentialsList />
            </Suspense>
          </FeatureSidenav>
          <div className="flex-1">{children}</div>
        </div>
        {/* {modal} */}
        <div className="md:hidden">{children}</div>
      </div>
    </div>
  );
};

export default EmailCredentialLayout;

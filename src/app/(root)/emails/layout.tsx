import EmailCredentialsList from '@/components/pages/email/email-credentials-list';
import EmailNewForm from '@/components/pages/email/email-new-form';
import FeatureHeader from '@/components/pages/shared/feature-header';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import LayoutPager from '@/components/shared/layout-pager';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode, Suspense } from 'react';

interface EmailCredentialLayoutProps {
  children: ReactNode;
}

const EmailCredentialsLayout = ({ children }: EmailCredentialLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager type="Email" />
      <div className="rounded-md border border-border p-6">
        <FeatureHeader
          title="Email Credentials"
          label="Manage your email credentials"
        >
          <EmailNewForm />
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
        <div className="md:hidden">{children}</div>
      </div>
    </div>
  );
};

export default EmailCredentialsLayout;

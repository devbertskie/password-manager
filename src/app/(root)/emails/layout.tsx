import React, { ReactNode, Suspense } from 'react';
import EmailCredentialsList from '@/components/pages/email/email-credentials-list';
import EmailNewForm from '@/components/pages/email/email-new-form';
import EmailPagination from '@/components/pages/email/email-pagination';
import FeatureHeader from '@/components/pages/shared/feature-header';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import LayoutPager from '@/components/shared/layout-pager';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Accounts',
};

interface EmailCredentialLayoutProps {
  children: ReactNode;
}

const EmailCredentialsLayout = ({ children }: EmailCredentialLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager type="Email" />
      <Card>
        <CardContent className="p-4">
          <FeatureHeader
            title="Email Accounts"
            label="Manage your email accounts"
          >
            <EmailNewForm />
          </FeatureHeader>
          <Separator className="my-6" />

          <div className="hidden space-x-6 md:flex">
            {/* sidenav hear */}
            <FeatureSidenav>
              <Suspense fallback={<SideItemSkeleton count={10} />}>
                <EmailCredentialsList />
              </Suspense>
            </FeatureSidenav>
            <div className="flex-1">{children}</div>
          </div>
          <div className="md:hidden">{children}</div>
        </CardContent>
        <EmailPagination />
      </Card>
    </div>
  );
};

export default EmailCredentialsLayout;

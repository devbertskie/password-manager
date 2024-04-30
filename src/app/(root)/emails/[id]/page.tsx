import React, { Suspense } from 'react';
import EmailPreviewPage from '@/components/pages/email/email-preview-page';
import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import { notFound } from 'next/navigation';

interface EmailCredentialPreviewListProps {
  params: {
    id: string;
  };
}

const EmailCredentialPreviewList = ({
  params,
}: EmailCredentialPreviewListProps) => {
  if (!params) {
    return notFound();
  }

  return (
    <div className="space-y-3">
      <Suspense fallback={<CredentialItemSkeleton />}>
        <EmailPreviewPage params={params} />
      </Suspense>
    </div>
  );
};

export default EmailCredentialPreviewList;

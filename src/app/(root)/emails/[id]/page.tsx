import React, { Suspense } from 'react';
import EmailPreviewPage from '@/components/pages/email/email-preview-page';
import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import { notFound } from 'next/navigation';
import { fetchAllEmails } from '@/query';

interface EmailCredentialPreviewListProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const credentials = await fetchAllEmails();
  return credentials.map((credential) => ({
    id: credential.id,
  }));
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

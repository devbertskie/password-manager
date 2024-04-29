import CredentialSkeleton from '@/components/pages/shared/credential-item-skeleton';
import WebPreviewPage from '@/components/pages/web/web-preview';
import { fetchAllCredentials } from '@/query';
import { notFound } from 'next/navigation';

import React, { Suspense } from 'react';

interface WebCredentialPreviewListProps {
  params: {
    id: string;
  };
}
export async function generateStaticParams() {
  const credentials = await fetchAllCredentials();
  return credentials.map((credential) => ({
    id: credential.id,
  }));
}

const WebCredentialPreviewList = ({
  params,
}: WebCredentialPreviewListProps) => {
  if (!params) {
    return notFound();
  }

  return (
    <div className="space-y-3">
      <Suspense fallback={<CredentialSkeleton />}>
        <WebPreviewPage params={params} />
      </Suspense>
    </div>
  );
};

export default WebCredentialPreviewList;

import React, { Suspense } from 'react';
import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import ModalWrapper from '@/components/pages/shared/modal-wrapper';

import { notFound } from 'next/navigation';
import EmailPreviewPage from '@/components/pages/email/email-preview-page';
import { fetchAllEmails } from '@/query';

interface EmailMobilePopUpProps {
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

export default function EmailMobilePopUp({ params }: EmailMobilePopUpProps) {
  if (!params) {
    return notFound();
  }

  return (
    <ModalWrapper isOpen>
      <div className="space-y-3">
        <Suspense fallback={<CredentialItemSkeleton />}>
          <EmailPreviewPage params={params} />
        </Suspense>
      </div>
    </ModalWrapper>
  );
}

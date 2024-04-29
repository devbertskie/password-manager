import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import ModalWrapper from '@/components/pages/shared/modal-wrapper';

import WebPreviewPage from '@/components/pages/web/web-preview';
import { notFound } from 'next/navigation';

import React, { Suspense } from 'react';

interface WebMobilePopUpProps {
  params: {
    id: string;
  };
}

export default function WebMobilePopUp({ params }: WebMobilePopUpProps) {
  if (!params) {
    return notFound();
  }
  return (
    <ModalWrapper isOpen>
      <div className="space-y-3">
        <Suspense fallback={<CredentialItemSkeleton />}>
          <WebPreviewPage params={params} />
        </Suspense>
      </div>
    </ModalWrapper>
  );
}

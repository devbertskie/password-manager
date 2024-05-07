import React, { Suspense } from 'react';
import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import ModalWrapper from '@/components/pages/shared/modal-wrapper';

import { notFound } from 'next/navigation';

import NotePreviewPage from '@/components/pages/note/note-preview-page';

interface NoteMobilePopUpProps {
  params: {
    id: string;
  };
}

export default function NoteMobilePopUp({ params }: NoteMobilePopUpProps) {
  if (!params) {
    return notFound();
  }

  return (
    <ModalWrapper isOpen>
      <div className="space-y-3">
        <Suspense fallback={<CredentialItemSkeleton />}>
          <NotePreviewPage params={params} />
        </Suspense>
      </div>
    </ModalWrapper>
  );
}

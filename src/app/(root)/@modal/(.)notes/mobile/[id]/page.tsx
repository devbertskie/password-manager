import React, { Suspense } from 'react';
import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import ModalWrapper from '@/components/pages/shared/modal-wrapper';

import { notFound } from 'next/navigation';

import NotePreviewPage from '@/components/pages/note/note-preview-page';
import { fetchAllNotes } from '@/query';

interface NoteMobilePopUpProps {
  params: {
    id: string;
  };
}
export async function generateStaticParams() {
  const credentials = await fetchAllNotes();
  return credentials.map((credential) => ({
    id: credential.id,
  }));
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

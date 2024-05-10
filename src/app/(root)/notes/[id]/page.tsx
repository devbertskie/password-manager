import React, { Suspense } from 'react';

import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import { notFound } from 'next/navigation';
import NotePreviewPage from '@/components/pages/note/note-preview-page';
import { fetchAllNotes } from '@/query';

interface NotePreviewListProps {
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

const NotePreviewList = ({ params }: NotePreviewListProps) => {
  if (!params) {
    return notFound();
  }

  return (
    <div className="space-y-3">
      <Suspense fallback={<CredentialItemSkeleton />}>
        <NotePreviewPage params={params} />
      </Suspense>
    </div>
  );
};

export default NotePreviewList;

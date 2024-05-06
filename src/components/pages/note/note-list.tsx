import { fetchAllNotes } from '@/actions';
import { notFound } from 'next/navigation';
import React from 'react';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

export default async function NoteList() {
  const noteLists = await fetchAllNotes();

  if (!noteLists) {
    return notFound();
  }

  const noteData: CredentialTarget[] = noteLists.map((credential) => {
    const formattedDate = formatDistance(credential.createdAt, new Date(), {
      addSuffix: true,
    });

    return {
      credentialId: credential.id,
      title: credential.title,
      label: formattedDate,
      isImportant: credential.isImportant,
      __credentialType: 'Note',
    };
  });

  return <DataListCredentials<CredentialTarget> list={noteData} />;
}

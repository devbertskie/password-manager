import { getUsersData } from '@/actions';
import { notFound } from 'next/navigation';
import React from 'react';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

export default async function NoteList() {
  const usersData = await getUsersData();

  if (!usersData) {
    return notFound();
  }

  const { currentNotes } = usersData;

  const noteData: CredentialTarget[] = currentNotes.map((credential) => {
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

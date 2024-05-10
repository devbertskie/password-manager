import React from 'react';

import { notFound } from 'next/navigation';
import { getUsersData } from '@/actions';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

const NoteMobileCardWrapper = async () => {
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
};

export default NoteMobileCardWrapper;

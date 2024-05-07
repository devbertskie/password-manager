import React from 'react';

import { notFound } from 'next/navigation';
import { fetchAllNotes } from '@/actions';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

const NoteMobileCardWrapper = async () => {
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
};

export default NoteMobileCardWrapper;

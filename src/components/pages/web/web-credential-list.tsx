import React from 'react';
import { fetchAllCredentialsByUser } from '@/actions';

import { notFound } from 'next/navigation';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

const WebCredentialsList = async () => {
  const webCredentialsList = await fetchAllCredentialsByUser();

  if (!webCredentialsList) {
    return notFound();
  }

  const webCredentialData: CredentialTarget[] = webCredentialsList.map(
    (credential) => {
      const formattedDate = formatDistance(credential.createdAt, new Date(), {
        addSuffix: true,
      });
      return {
        title: credential.title,
        label: formattedDate,
        isImportant: credential.isImportant,
        credentialId: credential.id,
        __credentialType: 'Web',
      };
    },
  );

  return <DataListCredentials<CredentialTarget> list={webCredentialData} />;
};

export default WebCredentialsList;

import React from 'react';

import { notFound } from 'next/navigation';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';
import { getUsersData } from '@/actions/users/users-credential-list-action';

const WebCredentialsList = async () => {
  const userData = await getUsersData();
  if (!userData) {
    return notFound();
  }

  const { currentWebCredentials } = userData;

  const webCredentialData: CredentialTarget[] = currentWebCredentials.map(
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

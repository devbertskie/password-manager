import React from 'react';

import { notFound } from 'next/navigation';
import { getUsersData } from '@/actions';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

const WebMobileCardWrapper = async () => {
  const usersData = await getUsersData();

  if (!usersData) {
    return notFound();
  }

  const { currentWebCredentials } = usersData;

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

export default WebMobileCardWrapper;

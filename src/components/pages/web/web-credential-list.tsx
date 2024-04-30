import React from 'react';
import { fetchAllCredentialsByUser } from '@/actions';

import { notFound } from 'next/navigation';
import DataListCredentials from '@/components/pages/shared/data-list-credentials';
import { WebCredentialType } from '@/types';

const WebCredentialsList = async () => {
  const webCredentialsList = await fetchAllCredentialsByUser();

  if (!webCredentialsList) {
    return notFound();
  }

  const webCredentialData: WebCredentialType[] = webCredentialsList.map(
    (credential) => ({
      ...credential,
      __credentialType: 'Web',
    }),
  );

  return <DataListCredentials<WebCredentialType> list={webCredentialData} />;
};

export default WebCredentialsList;

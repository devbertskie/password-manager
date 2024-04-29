import React from 'react';

import { notFound } from 'next/navigation';
import { fetchAllCredentialsByUser } from '@/actions';
import DataListCredentials, {
  WebCredentialType,
} from '@/components/pages/shared/data-list-credentials';

const WebMobileCardWrapper = async () => {
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

export default WebMobileCardWrapper;

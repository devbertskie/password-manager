import React from 'react';
import { fetchAllWebCredentialsByUser } from '@/actions';

import { notFound } from 'next/navigation';
import DataListCredentials, {
  WebCredentialType,
} from '@/components/pages/shared/data-list-credentials';

const WebCredentialsList = async () => {
  const webCredentialsList = await fetchAllWebCredentialsByUser();

  if (webCredentialsList?.errorMsg) {
    return notFound();
  }

  if (!webCredentialsList?.webCredentialData) {
    return notFound();
  }

  const webCredentialData: WebCredentialType[] =
    webCredentialsList.webCredentialData.map((credential) => ({
      ...credential,
      __credentialType: 'Web',
    }));

  return <DataListCredentials<WebCredentialType> list={webCredentialData} />;
};

export default WebCredentialsList;

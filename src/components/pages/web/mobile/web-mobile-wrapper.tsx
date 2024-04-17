import React from 'react';

import { notFound } from 'next/navigation';
import { fetchAllWebCredentialsByUser } from '@/actions';
import DataListCredentials, {
  WebCredentialType,
} from '@/components/pages/shared/data-list-credentials';

const WebMobileCardWrapper = async () => {
  const webCredentialsList = await fetchAllWebCredentialsByUser(10);

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

export default WebMobileCardWrapper;

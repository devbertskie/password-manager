import React from 'react';

import { notFound } from 'next/navigation';
import { fetchAllEmailCredentials } from '@/actions';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

const EmailMobileCardWrapper = async () => {
  const emailCredentialsList = await fetchAllEmailCredentials();

  if (!emailCredentialsList) {
    return notFound();
  }

  const emailCredentialData: CredentialTarget[] = emailCredentialsList.map(
    (credential) => {
      const formattedDate = formatDistance(credential.createdAt, new Date(), {
        addSuffix: true,
      });
      return {
        title: credential.title,
        label: formattedDate,
        isImportant: credential.isImportant,
        credentialId: credential.id,
        __credentialType: 'Email',
      };
    },
  );
  return <DataListCredentials<CredentialTarget> list={emailCredentialData} />;
};

export default EmailMobileCardWrapper;

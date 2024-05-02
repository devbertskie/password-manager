import React from 'react';

import { notFound } from 'next/navigation';
import { fetchAllEmailCredentials } from '@/actions';
import DataListCredentials from '@/components/pages/shared/data-list-credentials';
import { EmailCredentialType } from '@/types';

const EmailMobileCardWrapper = async () => {
  const emailCredentialsList = await fetchAllEmailCredentials();

  if (!emailCredentialsList) {
    return notFound();
  }

  const emailCredentialData: EmailCredentialType[] = emailCredentialsList.map(
    (credential) => ({
      ...credential,
      __credentialType: 'Email',
    }),
  );
  return (
    <DataListCredentials<EmailCredentialType> list={emailCredentialData} />
  );
};

export default EmailMobileCardWrapper;

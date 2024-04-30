import { fetchAllEmailCredentials } from '@/actions';
import { EmailCredentialType } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react';
import DataListCredentials from '@/components/pages/shared/data-list-credentials';

export default async function EmailCredentialsList() {
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
}

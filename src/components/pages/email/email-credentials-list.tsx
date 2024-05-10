import { getUsersData } from '@/actions';
import { notFound } from 'next/navigation';
import React from 'react';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

export default async function EmailCredentialsList() {
  const usersData = await getUsersData();

  if (!usersData) {
    return notFound();
  }

  const { currentEmailCredentials } = usersData;

  const emailCredentialData: CredentialTarget[] = currentEmailCredentials.map(
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
}

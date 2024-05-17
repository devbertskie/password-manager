/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { notFound, useSearchParams } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';
import { useToggle } from 'usehooks-ts';
import { getUserEmailCredentialData } from '@/actions';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import { PAGE_LIMIT } from '@/constants';
import ItemEmptyPage from '@/components/pages/shared/item-empty-page';

const EmailCredentialsList = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(true);
  const [emailCredentials, setEmailCredentials] = useState<{
    currentEmailCredentials: CredentialTarget[];
    totalPages: number;
    totalItems: number;
  } | null>(null);

  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const updated = searchParams.get('updated');
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);

  if (isNaN(parsedQuery)) return notFound();

  const getCurrentEmailCredentials = useCallback(
    async (currentPageNumber: number) => {
      try {
        setIsLoading(true);
        const emailData = await getUserEmailCredentialData(
          PAGE_LIMIT,
          currentPageNumber,
        );

        if (emailData) {
          const { currentEmailCredentials, totalPages, totalItems } = emailData;
          const emailCredentialData: CredentialTarget[] =
            currentEmailCredentials.map((credential) => {
              const formattedDate = formatDistance(
                credential.createdAt,
                new Date(),
                {
                  addSuffix: true,
                },
              );
              return {
                title: credential.title,
                label: formattedDate,
                isImportant: credential.isImportant,
                credentialId: credential.id,
                __credentialType: 'Email',
              };
            });
          setEmailCredentials({
            currentEmailCredentials: emailCredentialData,
            totalItems,
            totalPages,
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    if (parsedQuery || updated) {
      getCurrentEmailCredentials(parsedQuery);
    }
  }, [parsedQuery, getCurrentEmailCredentials, updated]);

  let displayCredential: ReactNode;

  if (isLoading) {
    return <SideItemSkeleton count={8} />;
  }

  if (!emailCredentials) {
    return <ItemEmptyPage label="You have no email credentials yet!" />;
  }

  if (
    parsedQuery > emailCredentials.totalPages &&
    emailCredentials.currentEmailCredentials.length === 0
  ) {
    return notFound();
  }

  if (emailCredentials.currentEmailCredentials.length === 0) {
    displayCredential = (
      <ItemEmptyPage label="You have no email credentials yet!" />
    );
  } else {
    displayCredential = (
      <DataListCredentials<CredentialTarget>
        list={emailCredentials.currentEmailCredentials}
      />
    );
  }

  return <>{!isLoading && displayCredential}</>;
};
export default EmailCredentialsList;

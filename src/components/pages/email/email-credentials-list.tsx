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
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(false);
  const [currentEmailCredentials, setCurrentEmailCredentials] = useState<
    CredentialTarget[]
  >([]);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);
  if (isNaN(parsedQuery)) return notFound();

  const getCurrentEmailCredentials = useCallback(
    async (currentPageNumber: number) => {
      try {
        setIsLoading(true);
        const userData = await getUserEmailCredentialData(
          PAGE_LIMIT,
          currentPageNumber,
        );

        if (userData) {
          const { currentEmailCredentials } = userData;
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

          setCurrentEmailCredentials(emailCredentialData);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    getCurrentEmailCredentials(parsedQuery);
  }, [parsedQuery, getCurrentEmailCredentials]);

  let displayCredential: ReactNode;

  if (isLoading) {
    return <SideItemSkeleton count={8} />;
  }

  if (currentEmailCredentials.length === 0) {
    displayCredential = (
      <ItemEmptyPage label="You have no email credentials yet!" />
    );
  } else {
    displayCredential = (
      <DataListCredentials<CredentialTarget> list={currentEmailCredentials} />
    );
  }

  return <>{!isLoading && displayCredential}</>;
};
export default EmailCredentialsList;

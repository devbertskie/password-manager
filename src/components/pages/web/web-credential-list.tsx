/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { getUserWebCredentialData } from '@/actions';
import { formatDistance } from 'date-fns';
import { useToggle } from 'usehooks-ts';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import { PAGE_LIMIT } from '@/constants';
import ItemEmptyPage from '@/components/pages/shared/item-empty-page';

const WebCredentialsList = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(true);
  const [webCredentials, setWebCredentials] = useState<{
    currentWebCredentials: CredentialTarget[];
    totalPages: number;
    totalItems: number;
  } | null>(null);

  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const updated = searchParams.get('updated');
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);

  if (isNaN(parsedQuery)) return notFound();

  const getCurrentWebCredentials = useCallback(
    async (currentPageNumber: number) => {
      try {
        setIsLoading(true);
        const webData = await getUserWebCredentialData(
          PAGE_LIMIT,
          currentPageNumber,
        );

        if (webData) {
          const { currentWebCredentials, totalPages, totalItems } = webData;
          const webCredentialData: CredentialTarget[] =
            currentWebCredentials.map((credential) => {
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
                __credentialType: 'Web',
              };
            });
          setWebCredentials({
            currentWebCredentials: webCredentialData,
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
      getCurrentWebCredentials(parsedQuery);
    }
  }, [parsedQuery, getCurrentWebCredentials, updated]);

  let displayCredential: ReactNode;

  if (isLoading) {
    return <SideItemSkeleton count={8} />;
  }

  if (!webCredentials) {
    return <ItemEmptyPage label="You have no web credentials yet!" />;
  }

  if (
    parsedQuery > webCredentials.totalPages &&
    webCredentials.currentWebCredentials.length === 0
  ) {
    return notFound();
  }

  if (webCredentials.currentWebCredentials.length === 0) {
    displayCredential = (
      <ItemEmptyPage label="You have no web credentials yet!" />
    );
  } else {
    displayCredential = (
      <DataListCredentials<CredentialTarget>
        list={webCredentials.currentWebCredentials}
      />
    );
  }

  return <>{!isLoading && displayCredential}</>;
};

export default WebCredentialsList;

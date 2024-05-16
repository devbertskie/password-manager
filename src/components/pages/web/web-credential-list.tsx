/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { notFound, useSearchParams } from 'next/navigation';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';
import { useToggle } from 'usehooks-ts';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import { Info } from 'lucide-react';
import { PAGE_LIMIT } from '@/components/pages/web/web-pagination';
import { getUserWebCredentialData } from '@/actions';

const WebCredentialsList = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(false);
  const [currentWebCredentials, setCurrentWebCredentials] = useState<
    CredentialTarget[]
  >([]);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);
  if (isNaN(parsedQuery)) return notFound();

  const getCurrentWebCredentials = useCallback(
    async (currentPageNumber: number) => {
      try {
        setIsLoading(true);
        const userData = await getUserWebCredentialData(
          PAGE_LIMIT,
          currentPageNumber,
        );

        if (userData) {
          const { currentWebCredentials } = userData;
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

          setCurrentWebCredentials(webCredentialData);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    getCurrentWebCredentials(parsedQuery);
  }, [parsedQuery, getCurrentWebCredentials]);

  let displayCredential: ReactNode;

  if (isLoading) {
    return <SideItemSkeleton count={8} />;
  }

  if (currentWebCredentials.length === 0) {
    displayCredential = (
      <li className="-ml-2 flex min-h-[200px] flex-col items-center justify-center space-y-2">
        <Info className="size-8 text-primary/40" />
        <h3 className="font-space text-sm text-muted-foreground/70">
          You have no credentials yet!
        </h3>
      </li>
    );
  } else {
    displayCredential = (
      <DataListCredentials<CredentialTarget> list={currentWebCredentials} />
    );
  }

  return <>{!isLoading && displayCredential}</>;
};

export default WebCredentialsList;

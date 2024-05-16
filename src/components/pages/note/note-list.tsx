/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { getUserNoteCredentialData } from '@/actions';
import { notFound, useSearchParams } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';
import { useToggle } from 'usehooks-ts';
import { PAGE_LIMIT } from '@/constants';
import SideItemSkeleton from '../shared/side-item-skeleton';
import ItemEmptyPage from '../shared/item-empty-page';

const NoteList = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(false);
  const [currentNotesCredentials, setCurrentNotesCredentials] = useState<
    CredentialTarget[]
  >([]);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);
  if (isNaN(parsedQuery)) return notFound();

  const getCurrentNotesCredentials = useCallback(
    async (currentPageNumber: number) => {
      try {
        setIsLoading(true);
        const notesData = await getUserNoteCredentialData(
          PAGE_LIMIT,
          currentPageNumber,
        );

        if (notesData) {
          const { currentNotesCredentials } = notesData;
          const notesCredentialData: CredentialTarget[] =
            currentNotesCredentials.map((credential) => {
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
                __credentialType: 'Note',
              };
            });

          setCurrentNotesCredentials(notesCredentialData);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    getCurrentNotesCredentials(parsedQuery);
  }, [parsedQuery, getCurrentNotesCredentials]);

  let displayCredential: ReactNode;

  if (isLoading) {
    return <SideItemSkeleton count={8} />;
  }

  if (currentNotesCredentials.length === 0) {
    displayCredential = <ItemEmptyPage label="You have no notes yet!" />;
  } else {
    displayCredential = (
      <DataListCredentials<CredentialTarget> list={currentNotesCredentials} />
    );
  }

  return <>{!isLoading && displayCredential}</>;
};

export default NoteList;

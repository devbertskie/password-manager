/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { getUserNoteCredentialData } from '@/actions';
import { notFound, useSearchParams } from 'next/navigation';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';
import { useToggle } from 'usehooks-ts';
import { PAGE_LIMIT } from '@/constants';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import ItemEmptyPage from '@/components/pages/shared/item-empty-page';

const NoteList = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(true);
  const [noteCredentials, setNoteCredentials] = useState<{
    currentNoteCredentials: CredentialTarget[];
    totalPages: number;
    totalItems: number;
  } | null>(null);

  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const updated = searchParams.get('updated');
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);

  if (isNaN(parsedQuery)) return notFound();

  const getCurrentNoteCredentials = useCallback(
    async (currentPageNumber: number) => {
      try {
        setIsLoading(true);
        const noteData = await getUserNoteCredentialData(
          PAGE_LIMIT,
          currentPageNumber,
        );

        if (noteData) {
          const { currentNotesCredentials, totalPages, totalItems } = noteData;
          const noteCredentialData: CredentialTarget[] =
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
          setNoteCredentials({
            currentNoteCredentials: noteCredentialData,
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
      getCurrentNoteCredentials(parsedQuery);
    }
  }, [parsedQuery, getCurrentNoteCredentials, updated]);

  let displayCredential: ReactNode;

  if (isLoading) {
    return <SideItemSkeleton count={8} />;
  }

  if (!noteCredentials) {
    return <ItemEmptyPage label="You have no notes yet!" />;
  }

  if (
    parsedQuery > noteCredentials.totalPages &&
    noteCredentials.currentNoteCredentials.length === 0
  ) {
    return notFound();
  }

  if (noteCredentials.currentNoteCredentials.length === 0) {
    displayCredential = <ItemEmptyPage label="You have no notes yet!" />;
  } else {
    displayCredential = (
      <DataListCredentials<CredentialTarget>
        list={noteCredentials.currentNoteCredentials}
      />
    );
  }

  return <>{!isLoading && displayCredential}</>;
};

export default NoteList;

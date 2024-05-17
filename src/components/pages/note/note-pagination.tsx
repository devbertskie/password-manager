/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getUserNoteCredentialData } from '@/actions';
import PagePagination from '@/components/shared/pagination';
import { CardFooter } from '@/components/ui/card';
import paths from '@/lib/paths';
import { Note } from '@prisma/client';
import { notFound, useSearchParams } from 'next/navigation';
import { PAGE_LIMIT } from '@/constants';
import PaginationSkeleton from '@/components/shared/pagination-skeleton';

export const dynamic = 'force-dynamic';

interface NotePaginationProps {
  currentNotesCredentials: Note[];
  totalPages: number;
  totalItems: number;
}

const NotePagination = () => {
  const [notesCredentials, setNotesCredentials] =
    useState<NotePaginationProps | null>(null);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const isUpdated = searchParams.get('updated');
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);
  if (isNaN(parsedQuery)) return notFound();

  const getNotesCredentials = useCallback(async (currentPageNumber: number) => {
    const notesData = await getUserNoteCredentialData(
      PAGE_LIMIT,
      currentPageNumber,
    );
    if (notesData) {
      setNotesCredentials(notesData);
    }
  }, []);

  useEffect(() => {
    if (parsedQuery || isUpdated) {
      getNotesCredentials(parsedQuery);
    }
  }, [parsedQuery, getNotesCredentials, isUpdated]);

  if (!notesCredentials) {
    return <PaginationSkeleton />;
  }

  const { currentNotesCredentials, totalItems, totalPages } = notesCredentials;
  return (
    <CardFooter className="flex flex-row items-center border-t px-6 py-4">
      <div className="text-xs text-muted-foreground">
        Showing <strong>1-{currentNotesCredentials.length}</strong> of{' '}
        <strong>{totalItems}</strong> items
      </div>
      {totalPages !== 1 && (
        <PagePagination
          currentPath={paths.toNotes()}
          currentPageNumber={parsedQuery}
          totalItems={totalPages || 1}
        />
      )}
    </CardFooter>
  );
};

export default NotePagination;

/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getUserWebCredentialData } from '@/actions';
import PagePagination from '@/components/shared/pagination';
import { CardFooter } from '@/components/ui/card';
import paths from '@/lib/paths';
import { WebCredential } from '@prisma/client';
import { notFound, useSearchParams } from 'next/navigation';
import WebPaginationSkeleton from '@/components/pages/web/web-pagination-skeleton';

interface WebPaginationProps {
  currentWebCredentials: WebCredential[];
  totalPages: number;
  totalItems: number;
}

export const PAGE_LIMIT = 10;

const WebPagination = () => {
  const [webCredentials, setWebCredentials] =
    useState<WebPaginationProps | null>(null);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);
  if (isNaN(parsedQuery)) return notFound();

  const getWebCredentials = useCallback(async (currentPageNumber: number) => {
    const webData = await getUserWebCredentialData(
      PAGE_LIMIT,
      currentPageNumber,
    );
    if (webData) {
      setWebCredentials(webData);
    }
  }, []);

  useEffect(() => {
    getWebCredentials(parsedQuery);
  }, [parsedQuery, getWebCredentials]);

  if (!webCredentials) {
    return <WebPaginationSkeleton />;
  }

  const { currentWebCredentials, totalItems, totalPages } = webCredentials;
  return (
    <CardFooter className="flex flex-row items-center border-t bg-primary/10 px-6 py-4">
      <div className="text-xs text-muted-foreground">
        Showing <strong>1-{currentWebCredentials.length}</strong> of{' '}
        <strong>{totalItems}</strong> items
      </div>
      {totalPages !== 1 && (
        <PagePagination
          currentPath={paths.toWeb()}
          currentPageNumber={parsedQuery}
          totalItems={totalPages || 1}
        />
      )}
    </CardFooter>
  );
};

export default WebPagination;

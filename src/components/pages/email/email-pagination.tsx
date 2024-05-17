/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getUserEmailCredentialData } from '@/actions';
import PagePagination from '@/components/shared/pagination';
import { CardFooter } from '@/components/ui/card';
import paths from '@/lib/paths';
import { EmailCredential } from '@prisma/client';
import { notFound, useSearchParams } from 'next/navigation';
import { PAGE_LIMIT } from '@/constants';
import PaginationSkeleton from '@/components/shared/pagination-skeleton';

export const dynamic = 'force-dynamic';

interface EmailPaginationProps {
  currentEmailCredentials: EmailCredential[];
  totalPages: number;
  totalItems: number;
}

const EmailPagination = () => {
  const [emailCredentials, setEmailCredentials] =
    useState<EmailPaginationProps | null>(null);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const isUpdated = searchParams.get('updated');
  if (currentPage === '0') return notFound();
  const parsedQuery = Number(currentPage);
  if (isNaN(parsedQuery)) return notFound();

  const getEmailCredentials = useCallback(async (currentPageNumber: number) => {
    const emailData = await getUserEmailCredentialData(
      PAGE_LIMIT,
      currentPageNumber,
    );
    if (emailData) {
      setEmailCredentials(emailData);
    }
  }, []);

  useEffect(() => {
    if (parsedQuery || isUpdated) {
      getEmailCredentials(parsedQuery);
    }
  }, [parsedQuery, getEmailCredentials, isUpdated]);

  if (!emailCredentials) {
    return <PaginationSkeleton />;
  }

  const { currentEmailCredentials, totalItems, totalPages } = emailCredentials;
  return (
    <CardFooter className="flex flex-row items-center border-t px-6 py-4">
      <div className="text-xs text-muted-foreground">
        Showing <strong>1-{currentEmailCredentials.length}</strong> of{' '}
        <strong>{totalItems}</strong> items
      </div>
      {totalPages !== 1 && (
        <PagePagination
          currentPath={paths.toEmail()}
          currentPageNumber={parsedQuery}
          totalItems={totalPages || 1}
        />
      )}
    </CardFooter>
  );
};

export default EmailPagination;

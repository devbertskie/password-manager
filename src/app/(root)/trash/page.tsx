import TrashPage from '@/components/pages/trash/trash-page';
import TrashPageSkeleton from '@/components/pages/trash/trash-page-skeleton';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

interface TrashBinPageProps {
  searchParams: {
    page?: string;
  };
}

const TrashBinPage = ({ searchParams }: TrashBinPageProps) => {
  const currentPage = searchParams.page || '1';
  if (currentPage === '0') return notFound();
  // check if the query params pas is a type of number
  if (isNaN(Number(currentPage))) return notFound();
  return (
    <>
      <Suspense fallback={<TrashPageSkeleton />}>
        <TrashPage currentPage={Number(currentPage)} />
      </Suspense>
    </>
  );
};

export default TrashBinPage;

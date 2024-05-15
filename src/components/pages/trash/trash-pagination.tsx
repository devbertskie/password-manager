'use client';
import React, { ComponentProps } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import paths from '@/lib/paths';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PaginationHandle from './pagination-handle';

type TrashPaginationProps = {
  currentPageNumber: number;
  totalItems: number;
} & ComponentProps<typeof Link>;

const TrashPagination = ({
  currentPageNumber,
  totalItems,
}: TrashPaginationProps) => {
  const isLastItem = currentPageNumber === totalItems;

  const previousPage =
    currentPageNumber - 1 === 1
      ? paths.toTrash()
      : `${paths.toTrash()}?page=${currentPageNumber - 1}`;

  const nextPage =
    currentPageNumber !== totalItems
      ? `${paths.toTrash()}?page=${currentPageNumber + 1}`
      : '';

  return (
    <Pagination className="ml-auto mr-0 w-auto">
      <PaginationContent className="space-x-2 md:space-x-4">
        <PaginationItem>
          {currentPageNumber === 1 ? (
            <PaginationHandle
              type="button"
              icon={ChevronLeft}
              name="Prev"
              isDisabled={currentPageNumber === 1}
            />
          ) : (
            <PaginationHandle
              type="link"
              link={previousPage}
              icon={ChevronLeft}
              name="Prev"
              isDisabled={currentPageNumber === 1}
            />
          )}
        </PaginationItem>
        <PaginationItem>
          {isLastItem ? (
            <PaginationHandle
              type="button"
              icon={ChevronRight}
              name="Next"
              isDisabled={isLastItem}
            />
          ) : (
            <PaginationHandle
              type="link"
              link={nextPage}
              icon={ChevronRight}
              name="Next"
              isDisabled={isLastItem}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TrashPagination;

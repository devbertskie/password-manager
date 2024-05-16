'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationHandle from '@/components/shared/pagination-handle';

type PaginationProps = {
  currentPageNumber: number;
  totalItems: number;
  currentPath: string;
};

const PagePagination = ({
  currentPageNumber,
  totalItems,
  currentPath,
}: PaginationProps) => {
  const isLastItem = currentPageNumber === totalItems;

  const previousPage =
    currentPageNumber - 1 === 1
      ? currentPath
      : `${currentPath}?page=${currentPageNumber - 1}`;

  const nextPage =
    currentPageNumber !== totalItems
      ? `${currentPath}?page=${currentPageNumber + 1}`
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

export default PagePagination;

/* eslint-disable no-unused-vars */
'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useToggle, useDebounceValue } from 'usehooks-ts';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import GlobalResults from '@/components/search/global-results';

const GlobalSearch = () => {
  const [isOpenSearch, toggleIsOpenSearch, setIsOpenSearch] = useToggle(false);
  const [search, setSearch] = useState('');

  const [searchResult] = useDebounceValue(search.trim(), 500, {
    leading: true,
  });
  const handleCloseSearch = () => {
    setSearch('');
    setIsOpenSearch(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setSearch('');
        toggleIsOpenSearch();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleIsOpenSearch]);

  return (
    <>
      <div
        onClick={() => {
          setSearch('');
          setIsOpenSearch(true);
        }}
        className="transition-300 flex cursor-pointer items-center justify-between gap-x-2 rounded-md border border-primary/20 bg-transparent px-3 py-1 tracking-wide text-primary hover:bg-primary/20  hover:text-white md:w-[230px]"
      >
        <p className="hidden font-thin md:block">Search credential...</p>
        <Search className="size-4 md:hidden" />
        <kbd className="pointer-events-none inline-flex h-5 select-none">
          <p className="text-[12px] font-semibold">⌘K</p>
        </kbd>
      </div>
      <AlertDialog open={isOpenSearch} onOpenChange={handleCloseSearch}>
        <AlertDialogContent className="top-[calc(100vh_-_60%)] max-w-sm p-0 sm:top-[calc(100vh_-_70%)] md:max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 size-4  shrink-0 -translate-y-1/2 opacity-50" />
            <Input
              autoFocus={isOpenSearch}
              type="text"
              placeholder="Search credentials"
              className="max-w-fit rounded-none border-none pl-8 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AlertDialogCancel
              asChild
              className=" absolute right-0 top-1/3 z-10 flex shrink-0 -translate-y-1/2 cursor-pointer items-center border-0 bg-transparent text-muted-foreground hover:bg-transparent md:top-1/2"
            >
              <span>x</span>
            </AlertDialogCancel>
            <Separator />
          </div>
          <GlobalResults
            searchQuery={searchResult}
            onClose={() => setIsOpenSearch(false)}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GlobalSearch;

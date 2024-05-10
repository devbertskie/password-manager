'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CircleHelp,
  Globe,
  Loader,
  Mail,
  NotepadText,
  ScanSearch,
} from 'lucide-react';
import { useToggle } from 'usehooks-ts';
import { searchGlobally } from '@/actions';
import { SearchQueryResult } from '@/types';

import GlobalResultItems from './global-result-items';

interface GlobalResultsProps {
  searchQuery: string;
  onClose: () => void;
}

const GlobalResults = ({ onClose, searchQuery }: GlobalResultsProps) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, toggleIsLoading, setIsLoading] = useToggle(false);
  const [results, setResults] = useState<SearchQueryResult[] | null>(null);

  const fetchQuery = useCallback(
    async (query: string | null) => {
      if (!query) return null;
      setIsLoading(true);

      try {
        const queryResults = await searchGlobally(query);
        setResults(queryResults);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  useEffect(() => {
    if (searchQuery) {
      fetchQuery(searchQuery);
    } else {
      setResults(null);
    }
  }, [searchQuery, fetchQuery]);

  if (!results) {
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center space-y-3 opacity-50">
        <ScanSearch className="size-10 text-primary" />
        <p className="text-sm text-muted-foreground">Search credentials</p>
      </div>
    );
  }

  const filteredWebResults = results.filter((item) => item.type === 'Web');
  const filteredEmailResults = results.filter((item) => item.type === 'Email');
  const filteredNotesResults = results.filter((item) => item.type === 'Note');

  return (
    <div className="mb-2 min-h-[200px]">
      {isLoading ? (
        <div className="flex h-full flex-col items-center justify-center space-y-3">
          <Loader className="size-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Searching please wait...
          </p>
        </div>
      ) : (
        <>
          {results.length !== 0 ? (
            <div className="flex  flex-col gap-y-2 px-4">
              {filteredWebResults.length !== 0 && (
                <GlobalResultItems
                  onClose={onClose}
                  heading="Web Credential"
                  icon={Globe}
                  results={filteredWebResults}
                />
              )}
              {filteredEmailResults.length !== 0 && (
                <GlobalResultItems
                  onClose={onClose}
                  heading="Email Credential"
                  icon={Mail}
                  results={filteredEmailResults}
                />
              )}
              {filteredNotesResults.length !== 0 && (
                <GlobalResultItems
                  onClose={onClose}
                  heading="Notes"
                  icon={NotepadText}
                  results={filteredNotesResults}
                />
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-y-4">
              <CircleHelp className="size-10 text-primary/40" />
              <div className="text-muted-foreground">No results found</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GlobalResults;

'use client';
import React, { ElementType } from 'react';
import { Button } from '@/components/ui/button';
import { SearchQueryResult } from '@/types';
import { useRouter } from 'next/navigation';
import paths from '@/lib/paths';

interface GlobalResultItemsProps {
  heading: string;
  icon: ElementType;
  results: SearchQueryResult[];
  onClose: () => void;
}

const GlobalResultItems = ({
  heading,
  icon: Icon,
  results,
  onClose,
}: GlobalResultItemsProps) => {
  const router = useRouter();
  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onClose();
      command();
    },
    [onClose],
  );

  const renderLink = (result: SearchQueryResult) => {
    let newUrl = '';
    switch (result.type) {
      case 'Web':
        newUrl = paths.toWebItem(result.item.id);
        break;
      case 'Email':
        newUrl = paths.toEmailItem(result.item.id);
        break;
      case 'Note':
        newUrl = paths.toNoteItem(result.item.id);
        break;
    }
    return router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-y-2 ">
      <h2 className="text-xs text-muted-foreground">{heading}</h2>
      {results.map((result) => (
        <Button
          key={result.item.id}
          size="sm"
          variant="ghost"
          className="flex w-full items-center justify-start px-2"
          onClick={() => runCommand(() => renderLink(result))}
        >
          <Icon className="mr-2 size-4 text-primary" />
          <span className="line-clamp-1 text-wrap text-start text-muted-foreground">
            {result.item.title}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default GlobalResultItems;

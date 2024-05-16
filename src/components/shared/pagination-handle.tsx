import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { ElementType } from 'react';

type HandleType = {
  name: string;
  icon: ElementType;
  isDisabled: boolean;
};

type ButtonHandle = HandleType & {
  type: 'button';
};

type LinkHandle = HandleType & {
  type: 'link';
  link: string;
};

type PaginationHandleProps = ButtonHandle | LinkHandle;

const IconHandler = (props: PaginationHandleProps) => {
  if (props.type === 'button') {
    const { name, icon: Icon, isDisabled } = props;
    return (
      <>
        <span
          className={cn(
            isDisabled
              ? 'text-muted-foreground'
              : 'text-white group-hover:text-primary',
            'transition-300 hidden text-xs  md:inline',
          )}
        >
          {name}
        </span>
        <Icon
          className={cn(
            isDisabled
              ? 'text-muted-foreground'
              : 'text-white group-hover:text-primary transition-300',
            'size-3.5',
          )}
        />
      </>
    );
  }
  const { name, icon: Icon, isDisabled } = props;
  return (
    <>
      <span
        className={cn(
          isDisabled
            ? 'text-muted-foreground'
            : 'text-white group-hover:text-primary',
          'transition-300 hidden text-xs  md:inline',
        )}
      >
        {name}
      </span>
      <Icon
        className={cn(
          isDisabled
            ? 'text-muted-foreground'
            : 'text-white group-hover:text-primary transition-300',
          'size-3.5',
        )}
      />
    </>
  );
};

export default function PaginationHandle(props: PaginationHandleProps) {
  if (props.type === 'button') {
    const { name, isDisabled } = props;
    return (
      <Button
        disabled={isDisabled}
        size="sm"
        className={cn(
          isDisabled ? 'bg-gray cursor-not-allowed' : 'cursor-pointer',
          'hover:bg-transparent',
        )}
        variant="outline"
        asChild
      >
        <div
          className={cn(
            name === 'Prev' && 'flex-row-reverse',
            'flex items-center gap-x-1',
          )}
        >
          <IconHandler {...props} />
        </div>
      </Button>
    );
  }

  const { name, isDisabled, link } = props;

  return (
    <Button
      disabled={isDisabled}
      size="sm"
      className={cn(
        isDisabled ? 'bg-gray cursor-not-allowed' : 'cursor-pointer',
        'hover:bg-transparent',
      )}
      variant="outline"
      asChild
    >
      <Link
        className={cn(
          name === 'Prev' && 'flex-row-reverse',
          'flex items-center gap-x-1',
        )}
        href={link}
      >
        <IconHandler {...props} />
      </Link>
    </Button>
  );
}

'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

export type Item = {
  credentialId: string;
  title: string;
  label: string;
  Icon: React.ElementType;
  link: () => string;
};

interface CredentialItemProps {
  data: Item;
}

export default function CredentialItem({
  data: { title, label, credentialId, link, Icon },
}: CredentialItemProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link href={link()}>
      <li
        className={cn(
          segment === credentialId
            ? 'border-l border-l-primary bg-primary/20'
            : 'hover:bg-primary/20 bg-primary/10',
          'transition-300 group cursor-pointer rounded-sm  px-4 py-3 text-muted-foreground/70 ',
        )}
      >
        <div className="flex items-center space-x-4">
          <Icon
            className={cn(
              segment === credentialId
                ? 'text-primary'
                : 'group-hover:text-primary',
              'transition-300 size-5 ',
            )}
          />
          <div className="flex flex-1 flex-col space-y-0.5">
            <h3
              className={cn(
                'transition-300 font-space max-w-32 text-sm tracking-wider truncate text-primary/60 group-hover:text-primary capitalize',
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                'transition-300 text-xs max-w-32 truncate group-hover:text-muted-foreground ',
              )}
            >
              {label}
            </p>
          </div>

          {/* <Badge
            variant="secondary"
            className="self-start align-baseline text-[10px] tracking-wider text-green-400"
          >
            Web
          </Badge> */}
        </div>
      </li>
    </Link>
  );
}

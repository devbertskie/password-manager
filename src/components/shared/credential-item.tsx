'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import Ribbon from '@/components/shared/ribbon';

export type Item = {
  credentialId: string;
  title: string;
  label: string;
  isImportant: boolean;
  Icon: React.ElementType;
  desktopLink: () => string;
  mobileLink: () => string;
};

interface CredentialItemProps {
  data: Item;
}

export default function CredentialItem({
  data: {
    title,
    label,
    credentialId,
    desktopLink,
    mobileLink,
    Icon,
    isImportant,
  },
}: CredentialItemProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <Link href={desktopLink()} className="hidden  md:block">
        <li
          className={cn(
            segment === credentialId
              ? 'border-l border-l-primary bg-primary/80'
              : 'hover:bg-primary/20 bg-primary/10',
            'transition-300 group cursor-pointer rounded-sm  px-4 py-3 text-muted-foreground/70 relative overflow-hidden',
          )}
        >
          {isImportant && <Ribbon />}
          <div className="flex  items-center space-x-4">
            <Icon
              className={cn(
                isImportant && '!text-yellow-400',
                segment === credentialId
                  ? 'text-accent'
                  : 'group-hover:text-primary',
                'transition-300 size-5 ',
              )}
            />
            <div className="flex max-w-56 flex-1 flex-col space-y-0.5">
              <h3
                className={cn(
                  segment === credentialId
                    ? 'text-black font-semibold'
                    : 'text-primary/60 group-hover:text-primary',
                  'transition-300 font-space truncate  text-sm  capitalize',
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  segment === credentialId
                    ? 'text-black font-normal'
                    : 'group-hover:text-muted-foreground ',
                  'transition-300 text-xs truncate  ',
                )}
              >
                {label}
              </p>
            </div>
          </div>
        </li>
      </Link>

      <Card className="relative cursor-pointer overflow-hidden bg-primary/10 md:hidden">
        <CardContent className="p-3">
          <Link href={mobileLink()}>
            <div className="flex min-w-64 items-center space-x-2 min-[400px]:space-x-3">
              <Icon
                className={cn(
                  isImportant && '!text-yellow-400',
                  'hidden text-muted-foreground min-[400px]:block  min-[400px]:size-5',
                )}
              />
              <div className="ml-2 max-w-64 flex-1  space-y-1 tracking-wider text-muted-foreground max-[400px]:max-w-52">
                <h3 className="truncate font-space text-[14px] text-primary ">
                  {title}
                </h3>
                <p className="truncate text-xs  sm:text-sm">{label}</p>
              </div>
              {/* <Star className="xs:block hidden size-5 sm:size-6" /> */}
            </div>
          </Link>
        </CardContent>
        {isImportant && <Ribbon />}
      </Card>
    </>
  );
}

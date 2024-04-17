import { SIDEBAR_CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface CategoriesItemProps {
  pathname: string;
}

export default function CategoriesItem({ pathname }: CategoriesItemProps) {
  const items = SIDEBAR_CATEGORIES.map((list) => {
    return (
      <Link
        href={list.path}
        key={list.label}
        className={cn(
          list.path === pathname
            ? 'bg-primary/10 text-primary'
            : 'hover:bg-primary/10',
          'transition-300 group rounded-md px-3 py-2',
        )}
      >
        <li>
          <React.Fragment>
            <div className="flex items-center space-x-2">
              <list.icon className="transition-300 size-5 group-hover:text-primary" />
              <span className="transition-300 group-hover:text-primary">
                {list.label}
              </span>
            </div>
          </React.Fragment>
        </li>
      </Link>
    );
  });

  return items;
}

'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    label: string;
    path: string;
  }[];
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.path}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.path
              ? 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary'
              : 'hover:underline hover:bg-transparent',
            'justify-start',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;

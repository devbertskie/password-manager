'use client';
import { ChevronLeft, Home, ShieldCheck, SquareAsterisk } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useApp } from '@/context/app-context';
import SidebarProfile from './sidebar-profile';
import { usePathname } from 'next/navigation';
import paths from '@/lib/paths';
import { cn } from '@/lib/utils';
import { SIDEBAR_CATEGORIES } from '@/constants';

const Sidebar = () => {
  const { toggleSidebar } = useApp();
  const pathname = usePathname();

  const CategoriesComponent = () =>
    SIDEBAR_CATEGORIES.map((list) => {
      return (
        <li
          key={list.label}
          className={cn(
            pathname === list.path
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-primary/10',
            'transition-300 group rounded-md px-3 py-2',
          )}
        >
          <Link href={list.path} className="flex items-center space-x-2">
            <list.icon className="transition-300 size-5 group-hover:text-primary" />
            <span className="transition-300 group-hover:text-primary">
              {list.label}
            </span>
          </Link>
        </li>
      );
    });

  return (
    <div>
      <nav className="sidebar fixed inset-y-0 z-50 min-h-screen  w-[260px] border-r border-r-border bg-background transition-all duration-300">
        {/* WRAPPER */}

        {/* NAVBAR BRAND */}
        <div className="flex items-center justify-center p-4">
          <Link
            href={paths.toDashboard()}
            className="flex shrink-0 items-center"
          >
            <SquareAsterisk className="size-8 text-primary" />
            <span className="ml-2 font-space text-xl font-semibold">
              PassManager
            </span>
          </Link>
          <Button
            size="icon"
            className="collapse-icon icon-hover-primary ml-4 size-8  rounded-full transition-all duration-300"
            onClick={() => toggleSidebar()}
          >
            <ChevronLeft className="m-auto size-6" />
          </Button>
        </div>
        {/* END NAVBAR BRAND */}
        {/* START Sidebar LIST */}
        <div className="flex h-[calc(100%_-_32px)] flex-col justify-between p-4">
          <ul className="flex flex-col space-y-3 tracking-wider text-muted-foreground/70">
            <li
              className={cn(
                pathname === paths.toDashboard()
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/10',
                'transition-300 group rounded-md px-3 py-2',
              )}
            >
              <Link
                href={paths.toDashboard()}
                className="flex items-center space-x-2"
              >
                <Home className="transition-300 size-5 group-hover:text-primary" />
                <span className="transition-300 group-hover:text-primary">
                  Dashboard
                </span>
              </Link>
            </li>
            <h3 className="-mx-4 block border-l border-primary bg-primary/10 px-6 py-3 text-xs  uppercase text-muted-foreground">
              All Passwords
            </h3>
            <li
              className={cn(
                pathname === paths.toPasswords()
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/10',
                'transition-300 group rounded-md px-3 py-2',
              )}
            >
              <Link
                href={paths.toPasswords()}
                className="flex items-center space-x-2"
              >
                <ShieldCheck className="transition-300 size-5 group-hover:text-primary" />
                <span className="transition-300 group-hover:text-primary">
                  Passwords
                </span>
              </Link>
            </li>
            <h3 className="-mx-4 block border-l border-primary bg-primary/10 px-6 py-3 text-xs  uppercase text-muted-foreground">
              Categories
            </h3>
            <CategoriesComponent />
          </ul>

          <SidebarProfile />
        </div>
        {/* End Sidebar List */}

        {/* END WRAPPER */}
      </nav>
    </div>
  );
};

export default Sidebar;

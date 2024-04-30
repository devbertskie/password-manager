'use client';

import React from 'react';
import { Menu, Search, SquareAsterisk } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/app-context';
import { cn } from '@/lib/utils';
import isSmallScreen from '@/helpers/is-small-screen';
import UserNav from '@/components/shared/user-nav';
import ToggleMode from '../pages/shared/toggle-mode';

const Navbar = () => {
  const { toggleSidebar, isSidebarOpen } = useApp();

  return (
    <header className="z-40">
      <div className="shadow-sm">
        {/* WRAPPER */}
        <div
          className={cn(
            isSidebarOpen && isSmallScreen()
              ? 'justify-end'
              : 'justify-between',
            'flex w-full items-center border-b border-b-border justify-between bg-background  px-5 py-4 ',
          )}
        >
          <div className="horizontal-logo mr-2 flex items-center justify-center lg:hidden">
            <Button
              size="icon"
              className="icon-hover-primary mr-4 size-8 rounded-full  transition-all duration-300"
              onClick={() => toggleSidebar()}
            >
              <Menu className="size-6" />
            </Button>
            <Link
              href="/"
              className="flex shrink-0 items-center transition-all duration-300"
            >
              <SquareAsterisk className="size-8 text-primary" />
              <span className="ml-2 hidden font-space text-xl font-semibold md:inline">
                PassManager
              </span>
            </Link>
          </div>

          <div className="flex w-full items-center justify-end space-x-2">
            <div className="flex items-center space-x-2">
              <Button
                className="icon-hover-primary size-7 rounded-full p-1 transition-all duration-300"
                asChild
              >
                <Search className="size-5" />
              </Button>
              <div>
                <ToggleMode />
              </div>
            </div>
            <UserNav />
          </div>
        </div>

        {/* END WRAPPER */}
      </div>
    </header>
  );
};

export default Navbar;

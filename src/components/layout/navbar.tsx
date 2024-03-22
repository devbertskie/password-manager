'use client';

import React from 'react';
import { Menu, Moon, SquareAsterisk, Sun } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useApp } from '@/context/app-context';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const { toggleSidebar } = useApp();
  const { setTheme, theme } = useTheme();
  return (
    <header className="z-40">
      <div className="shadow-sm">
        {/* WRAPPER */}
        <div className="flex w-full items-center border-b border-b-border bg-background px-5 py-4">
          <div className="horizontal-logo mr-2 flex items-center justify-center lg:hidden">
            <Link
              href="/"
              className="flex shrink-0 items-center transition-all duration-300"
            >
              <SquareAsterisk className="size-8 text-primary" />
              <span className="ml-2 hidden font-space text-xl font-semibold md:inline">
                PassManager
              </span>
            </Link>

            <Button
              size="icon"
              className="icon-hover-primary ml-4 size-8 rounded-full  transition-all duration-300"
              onClick={() => toggleSidebar()}
            >
              <Menu className="size-6" />
            </Button>
          </div>

          <div className="mr-2 hidden sm:block">
            <Button
              type="button"
              size="icon"
              className="icon-hover-primary size-8  rounded-full transition-all duration-300"
              onClick={() =>
                theme === 'light' ? setTheme('dark') : setTheme('light')
              }
            >
              {theme === 'light' ? (
                <Moon className="size-6" />
              ) : (
                <Sun className="size-6" />
              )}
            </Button>
          </div>
        </div>
        {/* END WRAPPER */}
      </div>
    </header>
  );
};

export default Navbar;

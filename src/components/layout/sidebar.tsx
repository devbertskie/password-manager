'use client';
import { ChevronLeft, SquareAsterisk } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useApp } from '@/context/app-context';

const Sidebar = () => {
  const { toggleSidebar } = useApp();
  return (
    <div>
      <nav className="sidebar fixed inset-y-0 z-50 h-full min-h-screen w-[260px] transition-all duration-300">
        {/* WRAPPER */}
        <div className="h-full border-r border-r-border bg-background">
          {/* NAVBAR BRAND */}
          <div className="flex items-center justify-center px-5 py-4">
            <Link href="/" className="flex shrink-0 items-center">
              <SquareAsterisk className="size-8 text-primary" />
              <span className="ml-[5px] font-space text-xl font-semibold">
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
        </div>
        {/* END WRAPPER */}
      </nav>
    </div>
  );
};

export default Sidebar;

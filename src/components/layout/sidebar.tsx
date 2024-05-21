'use client';
import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  Home,
  Settings,
  SquareAsterisk,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/app-context';
import SidebarProfile from '@/components/layout/sidebar-profile';
import { useSelectedLayoutSegment } from 'next/navigation';
import paths from '@/lib/paths';
import { cn } from '@/lib/utils';
import isSmallScreen from '@/helpers/is-small-screen';
import CategoriesItem from '@/components/layout/categories-item';
import { useCurrentUser } from '@/hooks/use-current-user';

const Sidebar = () => {
  const currentUser = useCurrentUser();
  const segment = useSelectedLayoutSegment();
  const { toggleSidebar, isSidebarOpen } = useApp();
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    if (isSmallScreen() && !isSidebarOpen) {
      toggleSidebar();
    }
    setPathname(`/${segment}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment]);

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
            <Link
              href={paths.toDashboard()}
              className={cn(
                pathname === paths.toDashboard()
                  ? 'bg-primary'
                  : 'hover:bg-primary/10',
                'transition-300 group rounded-md px-3 py-2',
              )}
            >
              <li>
                <>
                  <div className="flex items-center space-x-2">
                    <Home
                      className={cn(
                        pathname === paths.toDashboard()
                          ? 'text-accent'
                          : 'group-hover:text-primary',
                        'transition-300 size-5 ',
                      )}
                    />
                    <span
                      className={cn(
                        pathname === paths.toDashboard()
                          ? 'text-accent'
                          : 'group-hover:text-primary',
                        'transition-300 size-5 ',
                      )}
                    >
                      Dashboard
                    </span>
                  </div>
                </>
              </li>
            </Link>
            <h3 className="-mx-4 block border-l border-primary bg-primary/10 px-6 py-3 text-xs  uppercase text-muted-foreground">
              Categories
            </h3>
            <CategoriesItem pathname={pathname} />
            <h3 className="-mx-4 block border-l border-primary bg-primary/10 px-6 py-3 text-xs  uppercase text-muted-foreground">
              Others
            </h3>
            <Link
              href={paths.toSettings()}
              className={cn(
                pathname === paths.toSettings()
                  ? 'bg-primary'
                  : 'hover:bg-primary/10',
                'transition-300 group rounded-md px-3 py-2',
              )}
            >
              <li>
                <>
                  <div className="flex items-center space-x-2">
                    <Settings
                      className={cn(
                        pathname === paths.toSettings()
                          ? 'text-accent'
                          : 'group-hover:text-primary',
                        'transition-300 size-5',
                      )}
                    />
                    <span
                      className={cn(
                        pathname === paths.toSettings()
                          ? 'text-accent'
                          : 'group-hover:text-primary',
                        'transition-300',
                      )}
                    >
                      Settings
                    </span>
                  </div>
                </>
              </li>
            </Link>
            <Link
              href={paths.toTrash()}
              className={cn(
                pathname === paths.toTrash()
                  ? 'bg-primary'
                  : 'hover:bg-primary/10',
                'transition-300 group rounded-md px-3 py-2',
              )}
            >
              <li>
                <>
                  <div className="flex items-center space-x-2">
                    <Trash2
                      className={cn(
                        pathname === paths.toTrash()
                          ? 'text-accent'
                          : 'group-hover:text-destructive',
                        'transition-300 size-5',
                      )}
                    />
                    <span
                      className={cn(
                        pathname === paths.toTrash()
                          ? 'text-accent'
                          : 'group-hover:text-destructive',
                        'transition-300',
                      )}
                    >
                      Trash
                    </span>
                  </div>
                </>
              </li>
            </Link>
          </ul>
          {currentUser && <SidebarProfile currentUser={currentUser} />}
        </div>
        {/* End Sidebar List */}

        {/* END WRAPPER */}
      </nav>
    </div>
  );
};

export default Sidebar;

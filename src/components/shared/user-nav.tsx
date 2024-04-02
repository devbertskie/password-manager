'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { useSession } from 'next-auth/react';
import { logOut } from '@/lib/sign-out';
import { USER_NAV_PROFILE } from '@/constants';
import { LogOut } from 'lucide-react';

const UserNav = () => {
  const { data: userSession } = useSession();
  const UserNavDropDown = () =>
    USER_NAV_PROFILE.map((list) => (
      <DropdownMenuItem
        key={list.label}
        className="transition-300 group flex items-center space-x-1 hover:bg-primary/10"
      >
        <list.icon className="transition-300 size-4 group-hover:text-primary" />
        <span className="transition-300 group-hover:text-primary">
          {list.label}
        </span>
      </DropdownMenuItem>
    ));

  return (
    <DropdownMenu>
      {/* trigger button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-7 rounded-full">
          <Avatar className="size-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      {/* end trigger button */}

      {/* menu */}
      <DropdownMenuContent
        className="w-48 text-muted-foreground/70"
        align="end"
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 font-space">
            <p className="text-sm font-medium leading-none text-primary">
              @{userSession?.user.username}
            </p>
            <p className="text-sm">{userSession?.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-muted-foreground">
          <UserNavDropDown />

          {/* logout */}
          <DropdownMenuItem
            className="transition-300 group flex items-center space-x-1 hover:bg-primary/10"
            onClick={logOut}
          >
            <LogOut className="transition-300 size-4 group-hover:text-primary" />
            <span className="transition-300 group-hover:text-primary">
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {/* End menu */}
    </DropdownMenu>
  );
};

export default UserNav;

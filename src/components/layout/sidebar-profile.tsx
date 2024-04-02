'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { logOut } from '@/lib/sign-out';
import { LogOut } from 'lucide-react';

const SidebarProfile = () => {
  const { data: userSession } = useSession();

  return (
    <div className="-mx-4 mb-4 flex cursor-pointer items-center space-x-2 bg-primary/10 px-6 py-4 tracking-wider">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>HB</AvatarFallback>
      </Avatar>
      <div className="group flex w-full items-center space-x-2 text-muted-foreground">
        <span className="transition-300 flex-1 font-space uppercase group-hover:text-primary">
          {userSession?.user.username}
        </span>
        <Button
          size="icon"
          className="icon-hover-primary ml-4 size-8  rounded-full transition-all duration-300"
          onClick={logOut}
        >
          <LogOut className="m-auto size-4" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarProfile;

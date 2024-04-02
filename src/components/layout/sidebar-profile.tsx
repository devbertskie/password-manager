'use client';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SignOutButton from '../shared/signed-out';
import { useSession } from 'next-auth/react';

const SidebarProfile = () => {
  const { data: userSession } = useSession();
  console.log(userSession);
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
        <SignOutButton />
      </div>
    </div>
  );
};

export default SidebarProfile;

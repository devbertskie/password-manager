'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import AvatarProfile from '@/components/shared/avatar-profile';

const SidebarProfile = () => {
  const { data: userSession } = useSession();

  return (
    <div className="-mx-4 mb-4 flex cursor-pointer items-center space-x-2 bg-primary/10 px-6 py-4 tracking-wider">
      <AvatarProfile className="size-8" />
      <div className="group flex w-full items-center space-x-2 text-muted-foreground">
        <span className="transition-300 flex-1 font-space uppercase group-hover:text-primary">
          {userSession?.user.username}
        </span>
        <Button
          size="icon"
          className="icon-hover-primary ml-4 size-8  rounded-full transition-all duration-300"
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/login?logout=true`,
              redirect: true,
            })
          }
        >
          <LogOut className="m-auto size-4" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarProfile;

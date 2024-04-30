'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import AvatarProfile from '@/components/shared/avatar-profile';
import { signOutUser } from '@/actions';
import { ExtendedUser } from '@/auth';

interface SidebarProfileProps {
  currentUser: ExtendedUser;
}

const SidebarProfile = ({ currentUser }: SidebarProfileProps) => {
  return (
    <div className="mb-8 flex cursor-pointer items-center space-x-2 rounded-lg bg-primary/10 px-4 py-2">
      <AvatarProfile className="size-8" />
      <div className="group flex w-full items-center space-x-4 text-muted-foreground">
        <div>
          <p className="transition-300 flex-1 group-hover:text-primary">
            @{currentUser?.username}
          </p>
          <p className="truncate text-[10px] text-primary sm:text-xs">
            {currentUser?.email}
          </p>
        </div>
        <Button
          size="icon"
          className="icon-hover-primary size-6 rounded-full transition-all duration-300"
          onClick={async () => await signOutUser()}
        >
          <LogOut className="m-auto size-3 sm:size-4" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarProfile;

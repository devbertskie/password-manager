'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/use-current-user';

interface AvatarProfileProps extends React.HTMLAttributes<HTMLElement> {
  imageSrc?: string | undefined;
}

const AvatarProfile = ({
  className,
  imageSrc,
  ...rest
}: AvatarProfileProps) => {
  const currentUser = useCurrentUser();
  return (
    <Avatar {...rest} className={cn(className)}>
      <AvatarImage
        src={imageSrc || currentUser?.image || ''}
        alt="profile"
        className="object-cover"
      />
      <AvatarFallback className="uppercase">
        {currentUser?.username.substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;

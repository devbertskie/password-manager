'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface AvatarProfileProps extends React.HtmlHTMLAttributes<HTMLElement> {
  imgSrc?: string;
}

const AvatarProfile = ({ className, imgSrc, ...rest }: AvatarProfileProps) => {
  const { data: session } = useSession();
  return (
    <Avatar {...rest} className={cn(className)}>
      <AvatarImage
        src={imgSrc || (session ? session?.user.picture : '')}
        alt="profile"
        className="object-cover"
      />
      <AvatarFallback className="uppercase">
        {session?.user.username.substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarProfile;

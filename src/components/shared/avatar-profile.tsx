import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { auth } from '@/auth';

interface AvatarProfileProps extends React.HtmlHTMLAttributes<HTMLElement> {
  imgSrc?: string;
}

const AvatarProfile = async ({
  className,
  imgSrc,
  ...rest
}: AvatarProfileProps) => {
  const session = await auth();

  if (!session) return null;

  return (
    <Avatar {...rest} className={cn(className)}>
      <AvatarImage
        src={imgSrc || session.user.image || ''}
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

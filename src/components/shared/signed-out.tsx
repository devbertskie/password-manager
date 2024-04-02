'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const SignOutButton = () => {
  const handleSignout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };
  return (
    <Button
      size="icon"
      className="icon-hover-primary ml-4 size-8  rounded-full transition-all duration-300"
      onClick={handleSignout}
    >
      <LogOut className="m-auto size-4" />
    </Button>
  );
};

export default SignOutButton;

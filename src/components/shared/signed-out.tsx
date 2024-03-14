'use client';

import React from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  const handleSignout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };
  return (
    <Button onClick={handleSignout} variant="default">
      Signout
    </Button>
  );
};

export default SignOutButton;

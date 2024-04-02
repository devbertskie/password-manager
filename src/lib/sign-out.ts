import { signOut } from 'next-auth/react';

export const logOut = () =>
  signOut({
    redirect: true,
    callbackUrl: `${window.location.origin}/login`,
  });

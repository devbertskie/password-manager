import { signOut } from 'next-auth/react';

export const logOut = async () => {
  await signOut({
    redirect: true,
    callbackUrl: `${window.location.origin}/login`,
  });
};

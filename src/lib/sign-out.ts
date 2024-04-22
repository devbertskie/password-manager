'use server';
import { signOut } from '@/lib/auth';

export const logOut = async () => {
  await signOut({
    redirectTo: '/login',
    // redirect: true,
    // callbackUrl: `${window.location.origin}/login`,
  });
};

'use server';

import { signOut } from '@/auth';
import { setFlash } from '@/components/shared/feedback';
import paths from '@/lib/paths';

export const signOutUser = async () => {
  setFlash({
    type: 'SUCCESS',
    message: 'Logout successfully',
    timestamp: Date.now(),
  });
  await signOut({
    redirectTo: paths.toLogin(),
  });
};

'use server';

import { signOut } from '@/auth';
import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import paths from '@/lib/paths';
import { credentialFormSchema } from '@/lib/schema';
import { fetchUserById } from '@/query';
import { compare, hash } from 'bcrypt';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { z } from 'zod';

export const changePassword = async (
  values: z.infer<typeof credentialFormSchema>,
) => {
  try {
    const currentUser = await getCurrentUser();
    const { newPassword, currentPassword, confirmPassword } = values;
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const existingUser = await fetchUserById(currentUser?.id);

    if (!existingUser) {
      setFlash({
        type: 'ERROR',
        message: 'No user found',
        timestamp: Date.now(),
      });
      return null;
    }

    if (newPassword !== confirmPassword) {
      setFlash({
        type: 'ERROR',
        message: 'Password not match',
        timestamp: Date.now(),
      });
      return null;
    }

    const isPasswordValid = await compare(
      currentPassword,
      existingUser.password,
    );

    if (!isPasswordValid) {
      setFlash({
        type: 'ERROR',
        message: 'Current password incorrect',
        timestamp: Date.now(),
      });
      return null;
    }

    const newHashedPassword = await hash(values.newPassword, 10);

    const updatedUser = await db.user.update({
      where: { id: currentUser.id },
      data: { password: newHashedPassword },
    });

    if (updatedUser) {
      setFlash({
        type: 'SUCCESS',
        message: 'Password updated. Please login again!',
        timestamp: Date.now(),
      });
      await signOut({ redirectTo: paths.toLogin() });
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error('Something went wrong');
  }
};

'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import paths from '@/lib/paths';
import { revalidatePath } from 'next/cache';
export const updateProfileImage = async (imageUrl: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const result = await db.user.update({
      where: { id: Number(currentUser.id) },
      data: { image_url: imageUrl },
      select: { image_url: true },
    });

    revalidatePath(paths.toSettings());
    return result;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

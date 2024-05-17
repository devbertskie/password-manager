'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import paths from '@/lib/paths';
import { initiateUpdate } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteNote = async (noteId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized');

    await db.note.update({
      where: { id: noteId },
      data: { isDeleted: true },
    });
  } catch (error) {
    throw new Error('Something went wrong');
  }

  revalidatePath(paths.toNotes());
  setFlash({
    type: 'SUCCESS',
    message: 'Note moved to trash',
    timestamp: Date.now(),
  });
  redirect(initiateUpdate(paths.toNotes()));
};

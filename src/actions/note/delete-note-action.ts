'use server';

import { setFlash } from '@/components/shared/feedback';
import { getCurrentUser } from '@/lib/current-user';
import paths from '@/lib/paths';
import { deleteNoteById } from '@/query';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteNote = async (noteId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized');

    await deleteNoteById(noteId);
  } catch (error) {
    throw new Error('Something went wrong');
  }

  revalidatePath(paths.toNotes());
  setFlash({
    type: 'SUCCESS',
    message: 'Note deleted',
    timestamp: Date.now(),
  });
  redirect(paths.toNotes());
};

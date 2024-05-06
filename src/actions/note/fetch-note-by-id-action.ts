'use server';

import { getCurrentUser } from '@/lib/current-user';
import { fetchNoteById } from '@/query';

export const fetchNote = async (noteId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const currentNote = await fetchNoteById(noteId);
    return currentNote;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

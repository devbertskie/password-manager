'use server';

import { getCurrentUser } from '@/lib/current-user';
import { fetchAllNotesByCurrentUser } from '@/query';

export const fetchAllNotes = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');
    const allNotesByUser = await fetchAllNotesByCurrentUser(currentUser.id);
    return allNotesByUser;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

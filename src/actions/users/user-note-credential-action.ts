'use server';

import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allNotesByUser } from '@/query';

export const getUserNoteCredentialData = async (
  limit: number,
  currentPage: number,
) => {
  try {
    const currentUsers = await getCurrentUser();
    if (!currentUsers || !currentUsers.id) throw new Error('Unauthorized');

    const credentialResponse = await allNotesByUser(currentUsers.id);

    if (!credentialResponse) return null;

    const { notes } = credentialResponse;

    const sortedNotesCredential = notes.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );

    const totalItems = notes.length;
    const { totalPages, startIndex, endIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );

    const currentNotesCredentials = sortedNotesCredential.slice(
      startIndex,
      endIndex,
    );

    return {
      currentNotesCredentials,
      totalPages,
      totalItems,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

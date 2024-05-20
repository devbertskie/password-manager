'use server';

import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allNotesByUser } from '@/query';

export const getUserNoteCredentialData = async (
  limit: number,
  currentPage: number,
  currentId?: string,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const credentials = await allNotesByUser(currentUser.id);

    const totalItems = credentials.length;
    const { totalPages, endIndex, startIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );
    let currentNotesCredentials = credentials.slice(startIndex, endIndex);

    if (currentId) {
      const existingCredential = credentials.find(
        (cred) => cred.id === currentId,
      );
      if (!existingCredential) return null;

      if (!currentNotesCredentials.includes(existingCredential)) {
        currentNotesCredentials.pop();
        currentNotesCredentials.unshift(existingCredential);
      } else {
        currentNotesCredentials = [...currentNotesCredentials];
      }
    }

    const sortedCredentials = currentNotesCredentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );
    return {
      currentNotesCredentials: sortedCredentials,
      totalItems,
      totalPages,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

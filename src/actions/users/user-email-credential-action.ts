'use server';
import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allEmailCredentialsByUser } from '@/query';

export const getUserEmailCredentialData = async (
  limit: number,
  currentPage: number,
  currentId?: string,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const credentials = await allEmailCredentialsByUser(currentUser.id);

    const totalItems = credentials.length;
    const { totalPages, endIndex, startIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );
    let currentEmailCredentials = credentials.slice(startIndex, endIndex);

    if (currentId) {
      const existingCredential = credentials.find(
        (cred) => cred.id === currentId,
      );
      if (!existingCredential) return null;

      if (!currentEmailCredentials.includes(existingCredential)) {
        currentEmailCredentials.pop();
        currentEmailCredentials.unshift(existingCredential);
      } else {
        currentEmailCredentials = [...currentEmailCredentials];
      }
    }

    const sortedCredentials = currentEmailCredentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );
    return {
      currentEmailCredentials: sortedCredentials,
      totalItems,
      totalPages,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

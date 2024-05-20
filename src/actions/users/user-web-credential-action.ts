'use server';
import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allWebCredentialsByUser } from '@/query';

export const getUserWebCredentialData = async (
  limit: number,
  currentPage: number,
  currentId?: string,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    // const skipIndex = currentPage <= 1 ? 0 : (currentPage - 1) * limit;

    const credentials = await allWebCredentialsByUser(currentUser.id);

    const totalItems = credentials.length;
    const { totalPages, endIndex, startIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );
    let currentWebCredentials = credentials.slice(startIndex, endIndex);
    if (currentId) {
      const existingCredential = credentials.find(
        (cred) => cred.id === currentId,
      );
      if (!existingCredential) return null;

      if (!currentWebCredentials.includes(existingCredential)) {
        currentWebCredentials.pop();
        currentWebCredentials.unshift(existingCredential);
      } else {
        currentWebCredentials = [...currentWebCredentials];
      }
    }
    const sortedCredentials = currentWebCredentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );
    return {
      currentWebCredentials: sortedCredentials,
      totalItems,
      totalPages,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

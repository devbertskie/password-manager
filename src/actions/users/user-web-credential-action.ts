'use server';
import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allWebCredentialsByUser } from '@/query';

export const getUserWebCredentialData = async (
  limit: number,
  currentPage: number,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    // const skipIndex = currentPage <= 1 ? 0 : (currentPage - 1) * limit;

    const credentials = await allWebCredentialsByUser(currentUser.id);

    const sortedCredentials = credentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );
    const totalItems = credentials.length;
    const { totalPages, endIndex, startIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );
    const currentWebCredentials = sortedCredentials.slice(startIndex, endIndex);

    return {
      currentWebCredentials,
      totalItems,
      totalPages,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

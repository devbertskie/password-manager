'use server';
import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allEmailCredentialsByUser } from '@/query';

export const getUserEmailCredentialData = async (
  limit: number,
  currentPage: number,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const credentials = await allEmailCredentialsByUser(currentUser.id);

    const sortedCredentials = credentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );
    const totalItems = credentials.length;
    const { totalPages, endIndex, startIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );
    const currentEmailCredentials = sortedCredentials.slice(
      startIndex,
      endIndex,
    );

    return {
      currentEmailCredentials,
      totalItems,
      totalPages,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

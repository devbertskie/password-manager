'use server';
import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';
import { allEmailCredentialsByUser } from '@/query';

export const getUserEmailCredentialData = async (
  limit: number,
  currentPage: number,
) => {
  try {
    const currentUsers = await getCurrentUser();
    if (!currentUsers || !currentUsers.id) throw new Error('Unauthorized');

    const credentialResponse = await allEmailCredentialsByUser(currentUsers.id);

    if (!credentialResponse) return null;

    const { emailCredentials } = credentialResponse;

    const sortedEmailCredential = emailCredentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );

    const totalItems = emailCredentials.length;
    const { totalPages, startIndex, endIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );

    const currentEmailCredentials = sortedEmailCredential.slice(
      startIndex,
      endIndex,
    );

    return {
      currentEmailCredentials,
      totalPages,
      totalItems,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

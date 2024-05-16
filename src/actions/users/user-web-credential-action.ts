'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import { getPaginatedData } from '@/lib/utils';

export const getUserWebCredentialData = async (
  limit: number,
  currentPage: number,
) => {
  try {
    const currentUsers = await getCurrentUser();
    if (!currentUsers || !currentUsers.id) throw new Error('Unauthorized');

    const credentialResponse = await db.user.findFirst({
      where: { id: currentUsers.id },
      select: {
        webCredentials: {
          where: { isDeleted: false },
          // orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
        },
        password: false,
        imageUrl: false,
        email: false,
        emailVerified: false,
        username: false,
        role: false,
        id: false,
        updatedAt: false,
        createdAt: false,
      },
    });

    if (!credentialResponse) return null;

    const { webCredentials } = credentialResponse;

    const sortedWebCredential = webCredentials.sort(
      (a, b) => Number(b.isImportant) - Number(a.isImportant),
    );

    const totalItems = webCredentials.length;
    const { totalPages, startIndex, endIndex } = getPaginatedData(
      totalItems,
      limit,
      currentPage,
    );

    const currentWebCredentials = sortedWebCredential.slice(
      startIndex,
      endIndex,
    );

    return {
      currentWebCredentials,
      totalPages,
      totalItems,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

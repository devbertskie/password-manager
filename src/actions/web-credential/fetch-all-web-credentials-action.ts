'use server';

import { getCurrentUser } from '@/lib/current-user';
import { fetchAllWebCredentialsByUserId } from '@/query/web-credential-query';

export const fetchAllCredentialsByUser = async (limit?: number) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('Unauthorized!');
  }
  try {
    const webCredentialsList = fetchAllWebCredentialsByUserId(
      Number(currentUser.id),
      limit,
    );

    return webCredentialsList;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

'use server';

import { getCurrentUser } from '@/lib/current-user';
import { fetchAllEmailCredentialsByUser } from '@/query';

export const fetchAllEmailCredentials = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new Error('Something went wrong: Unauthorized');
    }

    const allEmailCredentials = await fetchAllEmailCredentialsByUser(
      currentUser.id,
    );

    return allEmailCredentials;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

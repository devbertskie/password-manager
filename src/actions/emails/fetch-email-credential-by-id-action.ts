'use server';

import { getCurrentUser } from '@/lib/current-user';
import { fetchEmailCredentialById as fetchEmailCredById } from '@/query';

export const fetchEmailCredentialById = async (credentialId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Something went wrong: Unauthorized');

    const emailCredential = await fetchEmailCredById(credentialId);

    return emailCredential;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

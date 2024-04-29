'use server';

import { getCurrentUser } from '@/lib/current-user';
import { fetchWebcredentialById } from '@/query';

export const fetchCredentialById = async (webCredentialId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized');
    }
    const webCredential = await fetchWebcredentialById(webCredentialId);
    return webCredential;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

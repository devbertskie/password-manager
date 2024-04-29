'use server';
import { auth } from '@/auth';

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user) return null;

  return session.user;
};

'use client';

import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const { data: session } = useSession();

  if (!session || !session?.user) return null;

  return session.user;
};

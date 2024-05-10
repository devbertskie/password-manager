import { db } from '@/db';
import { cache } from 'react';

export const fetchAllEmailCredentialsByUser = cache(
  (userId: string, limit?: number) => {
    return db.emailCredential.findMany({
      where: { userId },
      orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
      take: limit || undefined,
    });
  },
);

export const fetchEmailCredentialById = (id: string) => {
  return db.emailCredential.findUnique({ where: { id } });
};

export const deleteEmailCredentialById = (id: string) => {
  return db.emailCredential.delete({ where: { id } });
};
export const fetchAllEmails = () => {
  return db.emailCredential.findMany();
};

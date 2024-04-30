import { db } from '@/db';

export const fetchAllEmailCredentialsByUser = (userId: string) => {
  return db.emailCredential.findMany({ where: { userId: Number(userId) } });
};

export const fetchEmailCredentialById = (id: string) => {
  return db.emailCredential.findUnique({ where: { id } });
};

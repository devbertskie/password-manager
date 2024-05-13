import { db } from '@/db';

export const fetchEmailCredentialById = (id: string) => {
  return db.emailCredential.findUnique({ where: { id } });
};

export const deleteEmailCredentialById = (id: string) => {
  return db.emailCredential.delete({ where: { id } });
};
export const fetchAllEmails = () => {
  return db.emailCredential.findMany();
};

import { db } from '@/db';

export const fetchEmailVerificationById = (id: string) => {
  return db.emailVerification.findUnique({ where: { id } });
};

export const fetchEmailVerificationByEmail = (email: string) => {
  return db.emailVerification.findFirst({ where: { email } });
};

export const fetchEmailVerificationByToken = (token: string) => {
  return db.emailVerification.findFirst({ where: { token } });
};

export const deleteEmailVerificationById = (id: string) => {
  return db.emailVerification.delete({ where: { id } });
};

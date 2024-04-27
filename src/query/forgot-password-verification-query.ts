import { db } from '@/db';

export const fetchForgotPasswordVerificationById = (id: string) => {
  return db.passwordVerification.findUnique({ where: { id } });
};

export const fetchForgotPasswordVerificationByEmail = (email: string) => {
  return db.passwordVerification.findFirst({ where: { email } });
};

export const fetchForgotPasswordVerificationByToken = (token: string) => {
  return db.passwordVerification.findFirst({ where: { token } });
};

export const deleteForgotPasswordVerificationById = (id: string) => {
  return db.passwordVerification.delete({ where: { id } });
};

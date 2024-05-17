import { db } from '@/db';
import { cache } from 'react';

export const fetchUserById = (userId: string) => {
  return db.user.findUnique({ where: { id: userId } });
};

export const fetchUserByEmail = (email: string) => {
  return db.user.findUnique({ where: { email } });
};

export const allWebCredentialsByUser = cache((userId: string) => {
  return db.webCredential.findMany({
    where: {
      userId,
      isDeleted: false,
    },
  });
});
export const allEmailCredentialsByUser = cache((userId: string) => {
  return db.emailCredential.findMany({
    where: {
      userId,
      isDeleted: false,
    },
  });
});
export const allNotesByUser = cache((userId: string) => {
  return db.note.findMany({
    where: {
      userId,
      isDeleted: false,
    },
  });
});

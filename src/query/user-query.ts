import { db } from '@/db';
import { cache } from 'react';

export const fetchUserById = (userId: string) => {
  return db.user.findUnique({ where: { id: userId } });
};

export const fetchUserByEmail = (email: string) => {
  return db.user.findUnique({ where: { email } });
};

export const allWebCredentialsByUser = (userId: string) => {
  return db.user.findFirst({
    where: { id: userId },
    select: {
      webCredentials: {
        where: { isDeleted: false },
      },
      password: false,
      imageUrl: false,
      email: false,
      emailVerified: false,
      username: false,
      role: false,
      id: false,
      updatedAt: false,
      createdAt: false,
    },
  });
};
export const allEmailCredentialsByUser = cache((userId: string) => {
  return db.user.findFirst({
    where: { id: userId },
    select: {
      emailCredentials: {
        where: { isDeleted: false },
      },
      password: false,
      imageUrl: false,
      email: false,
      emailVerified: false,
      username: false,
      role: false,
      id: false,
      updatedAt: false,
      createdAt: false,
    },
  });
});
export const allNotesByUser = cache((userId: string) => {
  return db.user.findFirst({
    where: { id: userId },
    select: {
      notes: {
        where: { isDeleted: false },
      },
      password: false,
      imageUrl: false,
      email: false,
      emailVerified: false,
      username: false,
      role: false,
      id: false,
      updatedAt: false,
      createdAt: false,
    },
  });
});

import { db } from '@/db';
import { WebCredential } from '@prisma/client';
import { cache } from 'react';

export type CredentialDataType = Omit<
  WebCredential,
  'id' | 'createdAt' | 'updatedAt'
>;

export const fetchAllWebCredentialsByUserId = cache(
  (userId: string, limit?: number) => {
    return db.webCredential.findMany({
      where: { userId },
      orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
      take: limit || undefined,
    });
  },
);
export const fetchWebcredentialById = (id: string) => {
  return db.webCredential.findUnique({ where: { id } });
};

export const createWebCredential = (credential: CredentialDataType) => {
  return db.webCredential.create({
    data: credential,
  });
};

export const updateWebCredentialById = (
  credentialId: string,
  credentialData: CredentialDataType,
) => {
  return db.webCredential.update({
    where: { id: credentialId },
    data: credentialData,
  });
};

export const deleteCredentialById = (credentialId: string) => {
  return db.webCredential.delete({
    where: { id: credentialId },
  });
};

export const fetchAllCredentials = () => {
  return db.webCredential.findMany();
};

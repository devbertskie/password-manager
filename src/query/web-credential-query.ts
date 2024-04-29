import { db } from '@/db';
import { WebCredential } from '@prisma/client';

export type CredentialDataType = Omit<
  WebCredential,
  'id' | 'createdAt' | 'updatedAt'
>;

export const fetchWebcredentialById = (id: string) => {
  return db.webCredential.findUnique({ where: { id } });
};

export const fetchAllWebCredentialsByUserId = (
  userId: number,
  limit?: number,
) => {
  return db.webCredential.findMany({
    where: { userId },
    orderBy: [{ is_important: 'desc' }, { updatedAt: 'desc' }],
    take: limit || undefined,
  });
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

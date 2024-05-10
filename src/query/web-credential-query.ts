import { db } from '@/db';

export const fetchWebcredentialById = (id: string) => {
  return db.webCredential.findUnique({ where: { id } });
};

export const deleteCredentialById = (credentialId: string) => {
  return db.webCredential.delete({
    where: { id: credentialId },
  });
};

export const fetchAllCredentials = () => {
  return db.webCredential.findMany();
};

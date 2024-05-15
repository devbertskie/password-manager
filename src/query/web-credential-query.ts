import { db } from '@/db';

export const fetchWebcredentialById = (id: string) => {
  return db.webCredential.findFirst({
    where: {
      AND: [{ id }, { isDeleted: false }],
    },
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

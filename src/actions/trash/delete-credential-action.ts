'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import { getCurrentUser } from '@/lib/current-user';
import { CredentialType } from '@/types';

export const deleteTrashCredential = async (
  credentialId: string,
  type: CredentialType,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized');

    if (type === 'Web') {
      await db.webCredential.delete({
        where: { id: credentialId },
      });
    }
    if (type === 'Email') {
      await db.emailCredential.delete({
        where: { id: credentialId },
      });
    }
    if (type === 'Note') {
      await db.note.delete({
        where: { id: credentialId },
      });
    }
    setFlash({
      type: 'SUCCESS',
      message: 'Credential deleted',
      timestamp: Date.now(),
    });
    return toFormState('SUCCESS', 'Credential deleted');
  } catch (error) {
    return fromErrorsToFormState(error);
  }
};

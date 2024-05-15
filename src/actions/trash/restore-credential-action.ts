'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import { getCurrentUser } from '@/lib/current-user';
import { CredentialType } from '@/types';

export const restoreCredential = async (
  credentialId: string,
  type: CredentialType,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized');

    if (type === 'Web') {
      await db.webCredential.update({
        where: { id: credentialId },
        data: { isDeleted: false },
      });
    }
    if (type === 'Email') {
      await db.emailCredential.update({
        where: { id: credentialId },
        data: { isDeleted: false },
      });
    }
    if (type === 'Note') {
      await db.note.update({
        where: { id: credentialId },
        data: { isDeleted: false },
      });
    }
    setFlash({
      type: 'SUCCESS',
      message: 'Credential restored',
      timestamp: Date.now(),
    });
    return toFormState('SUCCESS', 'Credential restored');
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  // redirect(paths.toTrash());
};

'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { fetchWebcredentialById } from '@/query';
import { revalidatePath } from 'next/cache';

export const markAsImportant = async (credentialId: string) => {
  try {
    if (!credentialId) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    const existingCredential = await fetchWebcredentialById(credentialId);
    if (!existingCredential) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    await db.webCredential.update({
      where: { id: credentialId },
      data: {
        isImportant: !existingCredential.isImportant,
      },
    });
  } catch (error) {
    fromErrorsToFormState(error);
  }
  revalidatePath(paths.toWeb());
  revalidatePath(paths.toWebItem(credentialId));
  revalidatePath(paths.toWebItemMobile(credentialId));

  return toFormState('SUCCESS', 'Credential updated');
};

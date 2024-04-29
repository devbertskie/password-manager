'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { fetchWebcredentialById } from '@/query/web-credential-query';
import { revalidatePath } from 'next/cache';

export const markAsImportant = async (credentialId: string) => {
  if (!credentialId) {
    return toFormState('ERROR', 'Failed to update credential');
  }

  const existingCredential = await fetchWebcredentialById(credentialId);
  if (!existingCredential) {
    return toFormState('ERROR', 'Failed to update credential');
  }

  try {
    await db.webCredential.update({
      where: { id: credentialId },
      data: {
        is_important: !existingCredential.is_important,
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

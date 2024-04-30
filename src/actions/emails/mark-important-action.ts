'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { fetchEmailCredentialById } from '@/query';
import { revalidatePath } from 'next/cache';

export const markEmailAsImportant = async (credentialId: string) => {
  try {
    if (!credentialId) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    const existingCredential = await fetchEmailCredentialById(credentialId);
    if (!existingCredential) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    await db.emailCredential.update({
      where: { id: credentialId },
      data: {
        isImportant: !existingCredential.isImportant,
      },
    });
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  revalidatePath(paths.toEmail());
  revalidatePath(paths.toEmailItem(credentialId));
  revalidatePath(paths.toEmailItemMobile(credentialId));

  return toFormState('SUCCESS', 'Credential updated');
};

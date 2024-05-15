'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteCredential = async (credentialId: string) => {
  try {
    if (!credentialId) {
      toFormState('ERROR', 'Credential id not found');
    }
    await db.webCredential.update({
      where: { id: credentialId },
      data: {
        isDeleted: true,
      },
    });
    // return toFormState('SUCCESS', 'Credential deleted');
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  revalidatePath(paths.toWeb());
  setFlash({
    type: 'SUCCESS',
    message: 'Credential moved to trash',
    timestamp: Date.now(),
  });
  redirect(paths.toWeb());
};

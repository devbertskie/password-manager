'use server';

import { setFlash } from '@/components/shared/feedback';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { deleteCredentialById } from '@/query/web-credential-query';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteCredential = async (credentialId: string) => {
  try {
    if (!credentialId) {
      toFormState('ERROR', 'Credential id not found');
    }
    await deleteCredentialById(credentialId);
    // return toFormState('SUCCESS', 'Credential deleted');
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  revalidatePath(paths.toWeb());
  setFlash({
    type: 'SUCCESS',
    message: 'Credential deleted',
    timestamp: Date.now(),
  });
  redirect(paths.toWeb());
};

'use server';

import { setFlash } from '@/components/shared/feedback';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { deleteEmailCredentialById } from '@/query';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteEmailCredential = async (credentialId: string) => {
  try {
    if (!credentialId) {
      toFormState('ERROR', 'Credential id not found');
    }
    await deleteEmailCredentialById(credentialId);
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  revalidatePath(paths.toEmail());
  setFlash({
    type: 'SUCCESS',
    message: 'Credential deleted',
    timestamp: Date.now(),
  });
  redirect(paths.toEmail());
};

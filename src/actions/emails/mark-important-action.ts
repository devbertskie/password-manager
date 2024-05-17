'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { initiateUpdate } from '@/lib/utils';
import { fetchEmailCredentialById } from '@/query';
import { EmailCredential } from '@prisma/client';
import { redirect } from 'next/navigation';

let emailCredential: EmailCredential;
export const markEmailAsImportant = async (credentialId: string) => {
  try {
    if (!credentialId) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    const existingCredential = await fetchEmailCredentialById(credentialId);
    if (!existingCredential) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    emailCredential = await db.emailCredential.update({
      where: { id: credentialId },
      data: {
        isImportant: !existingCredential.isImportant,
      },
    });
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  setFlash({
    type: 'SUCCESS',
    message: 'Credential updated',
    timestamp: Date.now(),
  });

  redirect(initiateUpdate(paths.toEmailItem(emailCredential.id)));
};

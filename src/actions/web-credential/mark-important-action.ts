'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { initiateUpdate } from '@/lib/utils';
import { fetchWebcredentialById } from '@/query';
import { WebCredential } from '@prisma/client';
import { redirect } from 'next/navigation';

let webCredential: WebCredential;
export const markAsImportant = async (credentialId: string) => {
  try {
    if (!credentialId) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    const existingCredential = await fetchWebcredentialById(credentialId);
    if (!existingCredential) {
      return toFormState('ERROR', 'Failed to update credential');
    }

    webCredential = await db.webCredential.update({
      where: { id: credentialId },
      data: {
        isImportant: !existingCredential.isImportant,
      },
    });
  } catch (error) {
    fromErrorsToFormState(error);
  }
  setFlash({
    type: 'SUCCESS',
    message: 'Credential updated',
    timestamp: Date.now(),
  });

  redirect(initiateUpdate(paths.toWebItem(webCredential.id)));
};

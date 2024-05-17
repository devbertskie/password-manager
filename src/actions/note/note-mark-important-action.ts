'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { initiateUpdate } from '@/lib/utils';
import { fetchNoteById } from '@/query';
import { Note } from '@prisma/client';
import { redirect } from 'next/navigation';

let note: Note;
export const markNoteAsImportant = async (credentialId: string) => {
  try {
    if (!credentialId) {
      return toFormState('ERROR', 'Failed to update note');
    }

    const existingNote = await fetchNoteById(credentialId);
    if (!existingNote) {
      return toFormState('ERROR', 'Failed to update note');
    }

    note = await db.note.update({
      where: { id: credentialId },
      data: {
        isImportant: !existingNote.isImportant,
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

  redirect(initiateUpdate(paths.toNoteItem(note.id)));
};

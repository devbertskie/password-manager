'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import paths from '@/lib/paths';
import { fetchNoteById } from '@/query';
import { revalidatePath } from 'next/cache';

export const markNoteAsImportant = async (credentialId: string) => {
  try {
    if (!credentialId) {
      return toFormState('ERROR', 'Failed to update note');
    }

    const existingNote = await fetchNoteById(credentialId);
    if (!existingNote) {
      return toFormState('ERROR', 'Failed to update note');
    }

    await db.note.update({
      where: { id: credentialId },
      data: {
        isImportant: !existingNote.isImportant,
      },
    });
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  revalidatePath(paths.toNotes());
  revalidatePath(paths.toNoteItem(credentialId));
  revalidatePath(paths.toNoteItemMobile(credentialId));

  return toFormState('SUCCESS', 'Note updated');
};

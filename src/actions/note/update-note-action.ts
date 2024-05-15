'use server';

import { db } from '@/db';
import paths from '@/lib/paths';
import { noteFormSchema } from '@/lib/schema';
import { fetchNoteById } from '@/query';
import { JsonObject } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateNote = async (
  values: z.infer<typeof noteFormSchema>,
  credentialId: string,
) => {
  if (!credentialId) {
    throw new Error('Something went wrong: No ID');
  }
  try {
    const { title, content } = values;
    const existingNote = await fetchNoteById(credentialId);
    if (!existingNote)
      throw new Error('Something went wrong: No Existing note');

    const contentJson = content as JsonObject;
    const updatedNote = await db.note.update({
      where: { id: credentialId },
      data: {
        title,
        content: contentJson,
        isImportant: existingNote?.isImportant,
        isDeleted: existingNote.isDeleted,
      },
    });
    revalidatePath(paths.toNotes());
    revalidatePath(paths.toNoteItem(credentialId));
    revalidatePath(paths.toNoteItemMobile(credentialId));

    return updatedNote;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

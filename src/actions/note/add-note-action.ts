'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import paths from '@/lib/paths';
import { noteFormSchema } from '@/lib/schema';
import { JsonObject } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const addNote = async (values: z.infer<typeof noteFormSchema>) => {
  try {
    const { content, title, isImportant } = values;
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const contentJson = content as JsonObject;
    const newNote = await db.note.create({
      data: {
        title,
        isImportant,
        content: contentJson,
        userId: currentUser.id,
      },
    });

    revalidatePath(paths.toNotes());

    return newNote;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error('Something went wrong!');
  }
};

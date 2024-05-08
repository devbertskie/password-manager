import { db } from '@/db';
import { cache } from 'react';

export const fetchAllNotesByCurrentUser = cache(
  (userId: string, limit?: number) => {
    return db.note.findMany({
      where: { userId },
      orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
      take: limit || undefined,
    });
  },
);

export const fetchNoteById = (noteId: string) => {
  return db.note.findUnique({ where: { id: noteId } });
};

export const deleteNoteById = (noteId: string) => {
  return db.note.delete({ where: { id: noteId } });
};

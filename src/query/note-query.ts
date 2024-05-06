import { db } from '@/db';

export const fetchAllNotesByCurrentUser = (userId: string) => {
  return db.note.findMany({ where: { userId } });
};

export const fetchNoteById = (noteId: string) => {
  return db.note.findUnique({ where: { id: noteId } });
};

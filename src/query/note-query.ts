import { db } from '@/db';

export const fetchNoteById = (noteId: string) => {
  return db.note.findUnique({ where: { id: noteId } });
};

export const deleteNoteById = (noteId: string) => {
  return db.note.delete({ where: { id: noteId } });
};

export const fetchAllNotes = () => {
  return db.note.findMany();
};

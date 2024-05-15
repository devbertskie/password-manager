import { db } from '@/db';

export const fetchNoteById = (noteId: string) => {
  return db.note.findFirst({
    where: {
      AND: [{ id: noteId }, { isDeleted: false }],
    },
  });
};

export const deleteNoteById = (noteId: string) => {
  return db.note.delete({ where: { id: noteId } });
};

export const fetchAllNotes = () => {
  return db.note.findMany();
};

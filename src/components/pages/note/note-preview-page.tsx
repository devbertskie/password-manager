import React from 'react';
import { notFound } from 'next/navigation';
import NoteWrapper from '@/components/pages/note/note-wrapper';
import { fetchNote } from '@/actions';

interface NotePreviewPageProps {
  params: {
    id: string;
  };
}

export default async function NotePreviewPage({
  params,
}: NotePreviewPageProps) {
  const note = await fetchNote(params.id);
  if (!note) return notFound();
  return <NoteWrapper noteData={note} />;
}

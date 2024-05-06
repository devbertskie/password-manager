'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ClipboardPen, Loader, Trash2 } from 'lucide-react';
import { useToggle } from 'usehooks-ts';
import NoteMarkAsImportant from './note-mark-as-important';
import NoteDeleteModalForm from './note-delete-modal-form';
import { Note } from '@prisma/client';
import NotePreview from './note-preview';

interface NoteWrapperProps {
  noteData: Note;
}

export default function NoteWrapper({ noteData }: NoteWrapperProps) {
  const [isEditable, toggleEditable, setIsEditable] = useToggle(false);
  const [openDialogMoadlDelete, , setOpenDialog] = useToggle(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
        <h2 className="rounded-sm  px-3 py-1.5 text-center font-space text-sm tracking-wider text-primary md:line-clamp-1 md:text-left md:text-lg">
          {noteData.title}
        </h2>

        <div className="flex items-center space-x-2">
          <NoteMarkAsImportant
            isImportant={noteData.isImportant}
            credentialId={noteData.id}
          />

          <Button
            className="icon-hover-primary size-8 rounded-full transition-all duration-300 md:ml-4"
            size="icon"
            onClick={toggleEditable}
          >
            {' '}
            {isEditable ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <ClipboardPen className="size-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="icon-hover-error size-8 rounded-full transition-all duration-300"
            onClick={() => setOpenDialog(true)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col space-y-6 font-thin text-muted-foreground/70">
        <NotePreview
          noteData={noteData}
          isEditable={isEditable}
          onCancelEditable={() => setIsEditable(false)}
        />
      </div>
      <NoteDeleteModalForm
        credentialId={noteData.id}
        isOpen={openDialogMoadlDelete}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

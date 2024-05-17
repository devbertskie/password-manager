/* eslint-disable no-unused-vars */
'use client';
import React from 'react';
import AlertModalWrapper from '@/components/pages/shared/feature-alert-modal-wrapper';
import DeleteButton from '@/components/pages/shared/delete-button-submit';
import { useFormState } from 'react-dom';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { deleteNote } from '@/actions';

interface NoteDeleteModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  credentialId: string;
}

export default function NoteDeleteModalForm({
  isOpen,
  onClose,
  credentialId,
}: NoteDeleteModalFormProps) {
  const [formState, dispatch] = useFormState(
    deleteNote.bind(null, credentialId),
    EmptyFormState,
  );

  return (
    <AlertModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Move to trash?"
      description="This can be restore anytime. Continue?"
    >
      <form action={dispatch}>
        <DeleteButton />
      </form>
    </AlertModalWrapper>
  );
}

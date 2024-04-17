'use client';
import { deleteCredential } from '@/actions';

import React from 'react';
import { useFormState } from 'react-dom';
import DeleteButton from './delete-button-submit';
import { notify } from '@/lib/notification';
import AlertModalWrapper from '../shared/feature-alert-modal-wrapper';

interface WebDeleteModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  credentialId: string;
}

export default function WebDeleteModalForm({
  isOpen,
  onClose,
  credentialId,
}: WebDeleteModalFormProps) {
  const initialState = { message: '', errors: {} };
  const bindDeleteCredential = deleteCredential.bind(null, credentialId);
  const [state, dispatch] = useFormState(bindDeleteCredential, initialState);

  if (state.message) {
    notify.error(state.message);
  }

  return (
    <AlertModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Delete this credential?"
      description="This action cannot be undone. Continue?"
    >
      <form action={dispatch}>
        <DeleteButton />
      </form>
    </AlertModalWrapper>
  );
}

'use client';
import React from 'react';
import { deleteCredential } from '@/actions';
import { useFormState } from 'react-dom';
import DeleteButton from '@/components/pages/web/delete-button-submit';
import AlertModalWrapper from '@/components/pages/shared/feature-alert-modal-wrapper';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';

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
  const [formState, dispatch] = useFormState(
    deleteCredential.bind(null, credentialId),
    EmptyFormState,
  );

  useFormToastMessage(formState);

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

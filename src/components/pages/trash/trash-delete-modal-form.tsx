/* eslint-disable no-unused-vars */
'use client';
import React, { useEffect } from 'react';
import { deleteCredential, deleteTrashCredential } from '@/actions';
import { useFormState } from 'react-dom';
import DeleteButton from '@/components/pages/shared/delete-button-submit';
import AlertModalWrapper from '@/components/pages/shared/feature-alert-modal-wrapper';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useToggle } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { CredentialType } from '@/types';
import { useRouter } from 'next/navigation';

interface TrashDeleteModalFormProps {
  credentialId: string;
  type: CredentialType;
}

export default function TrashDeleteModalForm({
  credentialId,
  type,
}: TrashDeleteModalFormProps) {
  const router = useRouter();
  const [isOpenDelete, toggleIsOpenDelete, setIsOpenDelete] = useToggle(false);
  const [formState, dispatch] = useFormState(
    deleteTrashCredential.bind(null, credentialId, type),
    EmptyFormState,
  );

  useEffect(() => {
    if (formState.status === 'SUCCESS') {
      router.refresh();
      setIsOpenDelete(false);
    }
  }, [formState.status, router, setIsOpenDelete]);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpenDelete(true)}
        className="transition-300 cursor-pointer px-2  text-red-500 hover:bg-transparent hover:text-red-500"
        asChild
      >
        <div className="flex items-center">
          <Trash2 className="mr-1 size-3" />
          Delete{' '}
        </div>
      </Button>
      <AlertModalWrapper
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        title="Delete this credential?"
        description="This will permanently delete. Continue?"
      >
        <form action={dispatch}>
          <DeleteButton />
        </form>
      </AlertModalWrapper>
    </>
  );
}

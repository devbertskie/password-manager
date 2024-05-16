/* eslint-disable no-unused-vars */
'use client';
import React, { useEffect } from 'react';
import { restoreCredential } from '@/actions';
import { useFormStatus, useFormState } from 'react-dom';
import AlertModalWrapper from '@/components/pages/shared/feature-alert-modal-wrapper';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useToggle } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Loader2, RotateCcw } from 'lucide-react';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { CredentialType } from '@/types';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import { useRouter } from 'next/navigation';
import paths from '@/lib/paths';

interface TrashRestoreModalFormProps {
  credentialId: string;
  type: CredentialType;
}

const RestoreButton = () => {
  const { pending } = useFormStatus();

  return (
    <div className="space-x-2">
      <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
      <Button type="submit" size="sm" disabled={pending}>
        {pending && <Loader2 className="size-4 animate-spin" />}
        <span className={`${pending ? 'ml-2' : null}`}>
          {pending ? 'Restoring...' : 'Restore'}
        </span>
      </Button>
    </div>
  );
};

export default function TrashRestoreModalForm({
  credentialId,
  type,
}: TrashRestoreModalFormProps) {
  const router = useRouter();
  const [isOpenRestore, toggleIsOpenRestore, setIsOpenRestore] =
    useToggle(false);
  const [formState, dispatch] = useFormState(
    restoreCredential.bind(null, credentialId, type),
    EmptyFormState,
  );

  useEffect(() => {
    if (formState.status === 'SUCCESS') {
      router.refresh();
      setIsOpenRestore(false);
    }
  }, [formState.status, router, setIsOpenRestore]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpenRestore(true)}
        className="transition-300 cursor-pointer px-2 text-start text-muted-foreground hover:bg-transparent hover:text-yellow-500"
        asChild
      >
        <div className="flex items-center">
          <RotateCcw className="mr-1 size-3" />
          Restore{' '}
        </div>
      </Button>
      <AlertModalWrapper
        isOpen={isOpenRestore}
        onClose={() => setIsOpenRestore(false)}
        title="Restore this credential?"
        description="This will restore credential. Continue?"
      >
        <form action={dispatch}>
          <RestoreButton />
        </form>
      </AlertModalWrapper>
    </>
  );
}

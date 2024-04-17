'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilePen, FilePenLine, Trash2 } from 'lucide-react';
import { useToggle } from 'usehooks-ts';
import WebCredentialPreview from '@/components/pages/web/web-credential-preview';
import { WebCredentialResponse } from '@/actions/web-credential-action';
import { notify } from '@/lib/notification';
import WebDeleteModalForm from './web-delete-modal-form';
import { notFound } from 'next/navigation';

interface CredentialItemProps {
  webCredentialResponse: WebCredentialResponse;
}

export default function WebCredentialWrapper({
  webCredentialResponse,
}: CredentialItemProps) {
  const [isEditable, toggleEditable, setIsEditable] = useToggle(false);
  const [openDialogMoadlDelete, , setOpenDialog] = useToggle(false);
  if (webCredentialResponse.errorMsg) {
    notify.error(webCredentialResponse.errorMsg);
  }

  const webCredential = webCredentialResponse?.webCredentialData;

  if (!webCredential) {
    return notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="line-clamp-1 font-space text-lg tracking-wider">
          {webCredential?.title}
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            className="icon-hover-primary ml-4 size-8 rounded-full transition-all duration-300"
            size="icon"
            onClick={toggleEditable}
          >
            {' '}
            {isEditable ? (
              <FilePenLine className="size-4 text-yellow-300" />
            ) : (
              <FilePen className="size-4" />
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
        <WebCredentialPreview
          webCredential={webCredential}
          isEditable={isEditable}
          onCancelEditable={() => setIsEditable(false)}
        />
      </div>
      <WebDeleteModalForm
        credentialId={webCredential?.id}
        isOpen={openDialogMoadlDelete}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

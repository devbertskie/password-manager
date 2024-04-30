'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { EmailCredential } from '@prisma/client';
import { ClipboardPen, Loader, Trash2 } from 'lucide-react';
import { useToggle } from 'usehooks-ts';

import EmailMarkAsImportant from '@/components/pages/email/email-mark-as-important';
import EmailCredentialPreview from '@/components/pages/email/email-credential-preview';
import EmailDeleteModalForm from '@/components/pages/email/email-delete-modal-form';

interface EmailCredentialWrapperProps {
  emailCredential: EmailCredential;
}

export default function EmailCredentialWrapper({
  emailCredential,
}: EmailCredentialWrapperProps) {
  const [isEditable, toggleEditable, setIsEditable] = useToggle(false);
  const [openDialogMoadlDelete, , setOpenDialog] = useToggle(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
        <h2 className="rounded-sm  px-3 py-1.5 text-center font-space text-sm tracking-wider text-primary md:line-clamp-1 md:text-left md:text-lg">
          {emailCredential.title}
        </h2>

        <div className="flex items-center space-x-2">
          <EmailMarkAsImportant
            isImportant={emailCredential.isImportant}
            credentialId={emailCredential.id}
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
        <EmailCredentialPreview
          emailCredential={emailCredential}
          isEditable={isEditable}
          onCancelEditable={() => setIsEditable(false)}
        />
      </div>
      <EmailDeleteModalForm
        credentialId={emailCredential.id}
        isOpen={openDialogMoadlDelete}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}

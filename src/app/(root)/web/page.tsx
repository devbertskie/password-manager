'use client';
import WebCredentialPreview from '@/components/pages/web/web-credential-preview';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FilePen, FilePenLine } from 'lucide-react';
import React from 'react';
import { useToggle } from 'usehooks-ts';

const WebCredentialsPage = () => {
  const [isEditable, toggleEditable, setIsEditable] = useToggle(false);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-space text-lg tracking-wider">Netizion Account</h2>
        <Button
          className="icon-hover-primary ml-4 mr-3  size-8 rounded-full transition-all duration-300"
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
      </div>

      <Separator />

      <div className="flex flex-col space-y-6 font-thin text-muted-foreground/70">
        <WebCredentialPreview
          isEditable={isEditable}
          onCancelEditable={() => setIsEditable(false)}
        />
      </div>
    </div>
  );
};

export default WebCredentialsPage;

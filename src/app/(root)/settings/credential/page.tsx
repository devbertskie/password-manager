import { Separator } from '@/components/ui/separator';
import React from 'react';
import { auth } from '@/auth';
import CredentialForm from '@/components/pages/settings/credential-form';

const Credential = async () => {
  const session = await auth();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Credential</h3>
        <p className="text-sm text-muted-foreground">
          Update your password credential
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-6">
        <CredentialForm session={session} />
      </div>
    </div>
  );
};

export default Credential;

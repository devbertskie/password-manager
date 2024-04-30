import { EmailCredential, WebCredential } from '@prisma/client';

export interface FormState {
  status: 'UNSET' | 'SUCCESS' | 'ERROR';
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
}

export type CredentialType = 'Web' | 'Email' | 'Note' | 'Identities';

export type WebCredentialType = Partial<WebCredential> & {
  __credentialType: CredentialType;
};
export type EmailCredentialType = Partial<EmailCredential> & {
  __credentialType: CredentialType;
};

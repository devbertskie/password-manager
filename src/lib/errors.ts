import { CredentialsSignin } from 'next-auth';

export class InvalidCredentialError extends CredentialsSignin {
  code = 'invalid_credential_error';
}

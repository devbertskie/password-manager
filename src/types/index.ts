export interface FormState {
  status: 'UNSET' | 'SUCCESS' | 'ERROR';
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
}

export type CredentialType = 'Web' | 'Email' | 'Note';

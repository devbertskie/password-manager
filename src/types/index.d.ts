export interface FormState {
  status: 'UNSET' | 'SUCCESS' | 'ERROR';
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
}

export type CredentialType = 'Web' | 'Email' | 'Note';

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
  to?: string;
}

export interface RemovedUrlQueryParams {
  params: string;
  keysToRemove: string[];
  to?: string;
}

export interface SearchQueryResult {
  item: {
    id: string;
    title: string;
  };
  type: CredentialType;
}

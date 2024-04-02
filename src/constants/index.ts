import paths from '@/lib/paths';
import { GlobeLock, Mail, NotepadText, UserRound } from 'lucide-react';

export const SIDEBAR_CATEGORIES = [
  { label: 'Web Logins', icon: GlobeLock, path: paths.toWeb() },
  { label: 'Identity Documents', icon: UserRound, path: paths.toIdentities() },
  { label: 'Email Accounts', icon: Mail, path: paths.toEmails() },
  { label: 'Notes', icon: NotepadText, path: paths.toNotes() },
];

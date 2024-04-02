import paths from '@/lib/paths';
import {
  GlobeLock,
  Mail,
  NotepadText,
  Settings,
  UserCog,
  UserRound,
} from 'lucide-react';

export const SIDEBAR_CATEGORIES = [
  { label: 'Web Logins', icon: GlobeLock, path: paths.toWeb() },
  { label: 'Identity Documents', icon: UserRound, path: paths.toIdentities() },
  { label: 'Email Accounts', icon: Mail, path: paths.toEmails() },
  { label: 'Notes', icon: NotepadText, path: paths.toNotes() },
];

export const USER_NAV_PROFILE = [
  { label: 'Profile', icon: UserCog, path: paths.toWeb() },
  { label: 'Settings', icon: Settings, path: paths.toIdentities() },
];

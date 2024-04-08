import paths from '@/lib/paths';
import {
  GlobeLock,
  Mail,
  NotepadText,
  Settings,
  UserRound,
} from 'lucide-react';

export const MAX_IMAGE_SIZE = 5245880;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const SIDEBAR_CATEGORIES = [
  { label: 'Web Logins', icon: GlobeLock, path: paths.toWeb() },
  { label: 'Identity Documents', icon: UserRound, path: paths.toIdentities() },
  { label: 'Email Accounts', icon: Mail, path: paths.toEmails() },
  { label: 'Notes', icon: NotepadText, path: paths.toNotes() },
];

export const USER_NAV_PROFILE = [
  { label: 'Settings', icon: Settings, path: paths.toSettings() },
];

export const SETTINGS_LIST = [
  {
    label: 'Profile',
    path: paths.toSettings(),
  },
  {
    label: 'Credentials',
    path: paths.toChangePassword(),
  },
];

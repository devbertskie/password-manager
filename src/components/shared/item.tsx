import { GlobeIcon, Mail, NotepadText } from 'lucide-react';
import {
  CredentialTarget,
  ItemProps,
} from '@/components/pages/shared/data-list-credentials';
import CredentialItem, { Item } from '@/components/shared/credential-item';
import paths from '@/lib/paths';

export const WebCredentialItem = ({ item }: ItemProps<CredentialTarget>) => {
  const itemData: Item = {
    credentialId: item.credentialId,
    title: item.title,
    label: item.label,
    Icon: GlobeIcon,
    isImportant: item.isImportant || false,
    desktopLink: () => paths.toWebItem(item.credentialId),
    mobileLink: () => paths.toWebItemMobile(item.credentialId),
  };
  return <CredentialItem data={itemData} />;
};
export const EmailCredentialItem = ({ item }: ItemProps<CredentialTarget>) => {
  const itemData: Item = {
    credentialId: item.credentialId,
    title: item.title,
    label: item.label,
    Icon: Mail,
    isImportant: item.isImportant || false,
    desktopLink: () => paths.toEmailItem(item.credentialId),
    mobileLink: () => paths.toEmailItemMobile(item.credentialId),
  };
  return <CredentialItem data={itemData} />;
};

export const NoteItem = ({ item }: ItemProps<CredentialTarget>) => {
  const itemData: Item = {
    credentialId: item.credentialId,
    title: item.title,
    label: item.label,
    Icon: NotepadText,
    isImportant: item.isImportant || false,
    desktopLink: () => paths.toNoteItem(item.credentialId),
    mobileLink: () => paths.toNoteItemMobile(item.credentialId),
  };
  return <CredentialItem data={itemData} />;
};

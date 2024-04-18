import { GlobeIcon } from 'lucide-react';
import {
  ItemProps,
  WebCredentialType,
} from '@/components/pages/shared/data-list-credentials';
import CredentialItem, { Item } from '@/components/shared/credential-item';
import paths from '@/lib/paths';

export const WebCredentialItem = ({ item }: ItemProps<WebCredentialType>) => {
  const itemData: Item = {
    credentialId: item.id,
    title: item.title,
    label: item.site_url,
    Icon: GlobeIcon,
    isImportant: item.is_important,
    link: () => paths.toWebItem(item.id),
  };
  return <CredentialItem data={itemData} />;
};

'use client';
import React from 'react';
import FeatureItemList from '@/components/pages/shared/feature-item-list';
import {
  EmailCredentialItem,
  NoteItem,
  WebCredentialItem,
} from '@/components/shared/item';
import { CredentialType } from '@/types';

export type CredentialTarget = {
  title: string;
  label: string;
  isImportant: boolean;
  credentialId: string;
  __credentialType: CredentialType;
};

export interface ItemProps<T extends CredentialTarget> {
  item: T;
}
const FeatureItem = <T extends CredentialTarget>({ item }: ItemProps<T>) => {
  switch (item.__credentialType) {
    case 'Web':
      return <WebCredentialItem item={item} />;
    case 'Email':
      return <EmailCredentialItem item={item} />;
    case 'Note':
      return <NoteItem item={item} />;
    default:
      return null;
  }
};

interface FeatureItemProps<T extends CredentialTarget> {
  list: T[];
}

export default function DataListCredentials<T extends CredentialTarget>({
  list,
}: FeatureItemProps<T>) {
  return (
    <FeatureItemList>
      {list.map((item: T) => {
        return <FeatureItem key={item.credentialId} item={item} />;
      })}
    </FeatureItemList>
  );
}

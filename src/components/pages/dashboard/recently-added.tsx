import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ChevronRight, Info } from 'lucide-react';
import { CredentialType } from '@/types';
import { recentItems } from '@/actions';
import { formatDistance } from 'date-fns';
import paths from '@/lib/paths';

type RecentItemsType = {
  id: string;
  title: string;
  date: Date;
  type: CredentialType;
};

export interface RecentlyAddedProps {
  imageUrl: string;
  recentItems: RecentItemsType[];
}

const RecentlyAdded = async () => {
  const recentItemsData = await recentItems();
  let items: ReactNode;

  const renderLink = (item: RecentItemsType) => {
    let link = '';
    switch (item.type) {
      case 'Web':
        link = paths.toWebItem(item.id);
        break;
      case 'Email':
        link = paths.toEmailItem(item.id);
        break;
      case 'Note':
        link = paths.toNoteItem(item.id);
        break;
    }

    return link;
  };

  if (!recentItemsData || recentItemsData.recentItems.length === 0) {
    items = (
      <div className="flex h-24 flex-col items-center justify-center gap-y-3">
        <Info className="size-8 text-primary/20" />
        <p className="font-space text-muted-foreground">
          No recent items added!
        </p>
      </div>
    );
  } else {
    items = recentItemsData.recentItems.map((item) => (
      <Link
        key={item.id}
        href={renderLink(item)}
        className="transition-300 group hover:bg-primary/10"
      >
        <div className="flex items-center gap-4 rounded-sm px-3 py-2">
          <Avatar className="hidden size-9 sm:flex">
            <AvatarImage
              src={recentItemsData.imageUrl}
              alt="image-profile"
              className="object-cover"
            />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="transition-300 text-sm font-medium leading-none group-hover:text-primary">
              {item.title}
            </p>
            <p className="text-xs text-muted-foreground md:text-sm">
              {formatDistance(item.date, new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="transition-300 ml-auto flex items-center justify-between font-medium group-hover:text-primary">
            <ChevronRight className="size-5" />
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-space text-lg text-primary">
          Recently Added
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">{items}</CardContent>
    </Card>
  );
};

export default RecentlyAdded;

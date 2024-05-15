'use server';

import { RecentlyAddedProps } from '@/components/pages/dashboard/recently-added';
import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';

export const recentItems = async (): Promise<RecentlyAddedProps | null> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const recentItems = await db.user.findFirst({
      where: { id: currentUser.id },
      select: {
        webCredentials: {
          where: {
            isDeleted: false,
          },
          orderBy: { updatedAt: 'desc' },
          take: 2,
        },
        emailCredentials: {
          where: {
            isDeleted: false,
          },
          orderBy: { updatedAt: 'desc' },
          take: 2,
        },
        notes: {
          where: {
            isDeleted: false,
          },
          orderBy: { updatedAt: 'desc' },
          take: 2,
        },
        imageUrl: true,
      },
    });
    if (!recentItems)
      return {
        imageUrl: '',
        recentItems: [],
      };
    const recentItemsArr: RecentlyAddedProps['recentItems'] = [];

    if (recentItems.webCredentials) {
      recentItems.webCredentials.forEach((item) => {
        recentItemsArr.push({
          id: item.id,
          title: item.title,
          type: 'Web',
          date: new Date(item.updatedAt),
        });
      });
    }
    if (recentItems.emailCredentials) {
      recentItems.emailCredentials.forEach((item) => {
        recentItemsArr.push({
          id: item.id,
          title: item.title,
          type: 'Email',
          date: new Date(item.updatedAt),
        });
      });
    }
    if (recentItems.notes) {
      recentItems.notes.forEach((item) => {
        recentItemsArr.push({
          id: item.id,
          title: item.title,
          type: 'Note',
          date: new Date(item.updatedAt),
        });
      });
    }

    const items: RecentlyAddedProps = {
      imageUrl: recentItems.imageUrl,
      recentItems: recentItemsArr.sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      ),
    };

    return items;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

'use server';

import { TrashPageProps } from '@/components/pages/trash/trash-page';
import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import { cache } from 'react';

const allDeletedQuery = cache((userId: string) => {
  return db.user.findFirst({
    where: { id: userId },
    select: {
      webCredentials: {
        where: { isDeleted: true },
        select: { id: true, title: true, createdAt: true, updatedAt: true },
      },
      emailCredentials: {
        where: { isDeleted: true },
        select: { id: true, title: true, createdAt: true, updatedAt: true },
      },
      notes: {
        where: { isDeleted: true },
        select: { id: true, title: true, createdAt: true, updatedAt: true },
      },
      password: false,
      imageUrl: false,
      email: false,
      emailVerified: false,
      username: false,
      role: false,
      id: false,
      updatedAt: false,
      createdAt: false,
    },
  });
});

export const fetchAllDeletedItems = async (
  limit: number,
  currentPage: number,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const deletedItems: TrashPageProps[] = [];

    const allDeletedCredentials = await allDeletedQuery(currentUser.id);

    if (!allDeletedCredentials) return null;
    const { webCredentials, emailCredentials, notes } = allDeletedCredentials;

    if (webCredentials) {
      webCredentials.forEach((item) => {
        deletedItems.push({
          type: 'Web',
          id: item.id,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      });
    }
    if (emailCredentials) {
      emailCredentials.forEach((item) => {
        deletedItems.push({
          type: 'Email',
          id: item.id,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      });
    }
    if (notes) {
      notes.forEach((item) => {
        deletedItems.push({
          type: 'Note',
          id: item.id,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      });
    }
    const sortedItemsDeleted = deletedItems.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    );
    const totalItems = deletedItems.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = currentPage * limit;
    const sortedDeletedCredentials = sortedItemsDeleted.slice(
      startIndex,
      endIndex,
    );

    return { sortedDeletedCredentials, totalPages, totalItems };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

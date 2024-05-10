'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import { SearchQueryResult } from '@/types';

export const searchGlobally = async (query: string) => {
  const queryResults: SearchQueryResult[] = [];
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');
    if (!query) return null;
    const searchQuery = query.toLowerCase();

    const globalQueryResults = await db.user.findMany({
      where: {
        id: currentUser.id,
      },
      include: {
        webCredentials: {
          where: {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          select: { title: true, id: true },
          take: 3,
        },
        emailCredentials: {
          where: {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          select: { title: true, id: true },
          take: 3,
        },
        notes: {
          where: {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          select: { title: true, id: true },
          take: 3,
        },
      },
    });
    globalQueryResults.forEach((query) => {
      if (query.webCredentials) {
        query.webCredentials.forEach((cred) => {
          queryResults.push({
            item: {
              id: cred.id,
              title: cred.title,
            },
            type: 'Web',
          });
        });
      }
      if (query.emailCredentials) {
        query.emailCredentials.forEach((cred) => {
          queryResults.push({
            item: {
              id: cred.id,
              title: cred.title,
            },
            type: 'Email',
          });
        });
      }
      if (query.notes) {
        query.notes.forEach((cred) => {
          queryResults.push({
            item: {
              id: cred.id,
              title: cred.title,
            },
            type: 'Note',
          });
        });
      }
    });

    return queryResults;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

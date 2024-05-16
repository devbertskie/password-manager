'use server';
import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';

export const getUsersData = async () => {
  try {
    const currentUsers = await getCurrentUser();
    if (!currentUsers || !currentUsers.id) throw new Error('Unauthorized');

    const allCredentials = await db.user.findFirst({
      where: { id: currentUsers.id },
      select: {
        webCredentials: {
          where: { isDeleted: false },
          orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
        },
        emailCredentials: {
          where: { isDeleted: false },
          orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
        },
        notes: {
          where: { isDeleted: false },
          orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
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

    if (!allCredentials) return null;

    const { webCredentials, emailCredentials, notes } = allCredentials;

    return {
      currentWebCredentials: webCredentials,
      currentEmailCredentials: emailCredentials,
      currentNotes: notes,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { webCredentialFormSchema } from '@/lib/schema';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const addCredential = async (
  values: z.infer<typeof webCredentialFormSchema>,
) => {
  try {
    const { title, usernameOrEmail, password, siteUrl, isImportant } = values;
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const encryptedUsernameOrEmail = encryptText(usernameOrEmail);
    const encryptedPassword = encryptText(password);

    const newWebCredentialData = await db.webCredential.create({
      data: {
        title,
        password: encryptedPassword,
        usernameOrEmail: encryptedUsernameOrEmail,
        userId: currentUser.id,
        siteUrl,
        isImportant: isImportant || false,
      },
    });

    revalidatePath(paths.toWeb());
    return newWebCredentialData;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

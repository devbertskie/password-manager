'use server';

import { getCurrentUser } from '@/lib/current-user';
import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { emailCredentialFormSchema } from '@/lib/schema';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/db';

export const addEmailCredential = async (
  values: z.infer<typeof emailCredentialFormSchema>,
) => {
  try {
    const { title, usernameOrEmail, password, siteUrl, isImportant } = values;
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const encryptedUsernameOrEmail = encryptText(usernameOrEmail);
    const encryptedPassword = encryptText(password);

    // save to db
    const newWebCredentialData = await db.emailCredential.create({
      data: {
        title,
        password: encryptedPassword,
        usernameOrEmail: encryptedUsernameOrEmail,
        userId: currentUser.id,
        siteUrl,
        isImportant,
      },
    });
    revalidatePath(paths.toEmail());

    return newWebCredentialData;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

'use server';

import { getCurrentUser } from '@/lib/current-user';
import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { webCredentialFormSchema } from '@/lib/schema';
import {
  CredentialDataType,
  createWebCredential,
} from '@/query/web-credential-query';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const addCredential = async (
  values: z.infer<typeof webCredentialFormSchema>,
) => {
  try {
    const { title, usernameOrEmail, password, siteUrl, isImportant } = values;
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error('Unauthorized');

    const encryptedUsernameOrEmail = encryptText(usernameOrEmail);
    const encryptedPassword = encryptText(password);

    // save to db

    const dataCredential: CredentialDataType = {
      title,
      password: encryptedPassword,
      user_email: encryptedUsernameOrEmail,
      userId: Number(currentUser.id),
      site_url: siteUrl,
      is_important: isImportant || false,
    };

    revalidatePath(paths.toWeb());
    const newWebCredentialData = await createWebCredential(dataCredential);

    return newWebCredentialData;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

'use server';

import { db } from '@/db';
import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { webCredentialFormSchema } from '@/lib/schema';
import { fetchWebcredentialById } from '@/query';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateCredentialById = async (
  values: z.infer<typeof webCredentialFormSchema>,
  credentialId: string,
) => {
  if (!credentialId) {
    throw new Error('Something went wrong: No ID');
  }
  try {
    const { usernameOrEmail, title, siteUrl, password } = values;
    const existingCredential = await fetchWebcredentialById(credentialId);
    if (!existingCredential)
      throw new Error('Something went wrong: No Existing credential');

    const updatedCredential = await db.webCredential.update({
      where: { id: credentialId },
      data: {
        siteUrl,
        title,
        usernameOrEmail: encryptText(usernameOrEmail),
        password: encryptText(password),
        userId: existingCredential?.userId,
        isImportant: existingCredential?.isImportant,
        isDeleted: existingCredential.isDeleted,
      },
    });
    revalidatePath(paths.toWebItem(credentialId));
    revalidatePath(paths.toWebItemMobile(credentialId));
    revalidatePath(paths.toWeb());

    return updatedCredential;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

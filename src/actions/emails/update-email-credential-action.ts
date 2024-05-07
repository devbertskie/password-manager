'use server';

import { db } from '@/db';
import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { emailCredentialFormSchema } from '@/lib/schema';
import { fetchEmailCredentialById } from '@/query';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateEmailCredentialById = async (
  values: z.infer<typeof emailCredentialFormSchema>,
  credentialId: string,
) => {
  if (!credentialId) {
    throw new Error('Something went wrong: No ID');
  }
  try {
    const { usernameOrEmail, title, siteUrl, password } = values;
    const existingCredential = await fetchEmailCredentialById(credentialId);
    if (!existingCredential)
      throw new Error('Something went wrong: No Existing credential');

    const updatedCredential = await db.emailCredential.update({
      where: { id: credentialId },
      data: {
        usernameOrEmail: encryptText(usernameOrEmail),
        siteUrl,
        password: encryptText(password),
        title,
        userId: existingCredential?.userId,
        isImportant: existingCredential?.isImportant,
      },
    });
    revalidatePath(paths.toEmail());
    revalidatePath(paths.toEmailItem(credentialId));
    revalidatePath(paths.toEmailItemMobile(credentialId));

    return updatedCredential;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

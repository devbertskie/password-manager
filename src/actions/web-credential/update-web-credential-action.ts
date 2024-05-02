'use server';

import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { webCredentialFormSchema } from '@/lib/schema';
import { fetchWebcredentialById, updateWebCredentialById } from '@/query';
import { CredentialDataType } from '@/query/web-credential-query';
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

    const updatedCredentailValue: CredentialDataType = {
      usernameOrEmail: encryptText(usernameOrEmail),
      siteUrl,
      password: encryptText(password),
      title,
      userId: existingCredential?.userId,
      isImportant: existingCredential?.isImportant,
    };

    const updatedCredential = await updateWebCredentialById(
      credentialId,
      updatedCredentailValue,
    );
    revalidatePath(paths.toWebItem(credentialId));
    revalidatePath(paths.toWebItemMobile(credentialId));
    revalidatePath(paths.toWeb());

    return updatedCredential;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

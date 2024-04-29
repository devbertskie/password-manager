'use server';

import { encryptText } from '@/lib/encrypt-text';
import paths from '@/lib/paths';
import { webCredentialFormSchema } from '@/lib/schema';
import {
  CredentialDataType,
  fetchWebcredentialById,
  updateWebCredentialById,
} from '@/query/web-credential-query';
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
      user_email: encryptText(usernameOrEmail),
      site_url: siteUrl,
      password: encryptText(password),
      title,
      userId: existingCredential?.userId,
      is_important: existingCredential?.is_important,
    };

    const updatedCredential = await updateWebCredentialById(
      credentialId,
      updatedCredentailValue,
    );
    revalidatePath(paths.toWebItem(credentialId));
    revalidatePath(paths.toWeb());

    return {
      message: 'Credential updated',
      webCredentialData: updatedCredential,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        errorMsg: 'Unable to retrieve data',
      };
    }
  }
};

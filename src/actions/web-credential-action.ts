'use server';

import { webCredentialFormSchema } from '@/lib/schema';
import { WebCredential } from '@prisma/client';
import { z } from 'zod';
import AES from 'crypto-js/aes';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/lib/paths';

import { toFormState } from '@/helpers/to-form-state';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

import { setFlash } from '@/components/shared/feedback';

const SALT_KEY = process.env.SALT_KEY!;

export interface WebCredentialResponse {
  errorMsg?: string;
  message?: string;
  webCredentialData?: WebCredential | null;
}

interface AllWebCredentialsByUserResponse {
  errorMsg?: string;
  message?: string;
  webCredentialData?: WebCredential[];
}

export const addCredential = async (
  values: z.infer<typeof webCredentialFormSchema>,
  userId: string,
): Promise<WebCredentialResponse | undefined> => {
  try {
    const { title, usernameOrEmail, password, siteUrl } = values;

    if (!(title || usernameOrEmail || password || siteUrl).trim()) {
      return {
        errorMsg: 'All fields required',
      };
    }

    const encryptedUsernameOrEmail = AES.encrypt(
      usernameOrEmail,
      SALT_KEY,
    ).toString();
    const encryptedPassword = AES.encrypt(password, SALT_KEY).toString();

    // save to db

    const newWebCredentialData = await db.webCredential.create({
      data: {
        title,
        user_email: encryptedUsernameOrEmail,
        site_url: siteUrl,
        password: encryptedPassword,
        is_important: values.isImportant,
        userId: +userId,
      },
    });

    return {
      message: 'New credential added',
      webCredentialData: newWebCredentialData,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorMsg: 'Unable to add credential',
      };
    }
  }

  revalidatePath(paths.toWeb());
};

export const fetchAllWebCredentialsByUser = async (
  limit?: number,
): Promise<AllWebCredentialsByUserResponse | undefined> => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errorMsg: 'Unauthorized',
    };
  }
  try {
    const webCredentialsList = await db.webCredential.findMany({
      where: { userId: Number(session.user.id) },
      orderBy: [{ is_important: 'desc' }, { updatedAt: 'desc' }],

      take: limit && limit,
    });

    return {
      webCredentialData: webCredentialsList,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorMsg: 'Unable to retrieve data',
      };
    }
  }
};

export const fetchWebCredentialById = async (
  webCredentialId: string,
): Promise<WebCredentialResponse | undefined> => {
  try {
    const webCredential = await db.webCredential.findUnique({
      where: { id: webCredentialId },
    });

    if (!webCredential) {
      return {
        errorMsg: 'Credential Id invalid',
      };
    }

    return {
      webCredentialData: webCredential,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorMsg: 'Unable to retrieve data',
      };
    }
  }
};

export const fetchAllCredentials = async (): Promise<
  AllWebCredentialsByUserResponse | undefined
> => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errorMsg: 'Unauthorized',
    };
  }
  try {
    const webData = await db.webCredential.findMany({
      where: { userId: Number(session.user.id) },
    });

    return {
      webCredentialData: webData,
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

export const updateCredentialById = async (
  values: z.infer<typeof webCredentialFormSchema>,
  credentialId: string,
): Promise<WebCredentialResponse | undefined> => {
  if (!credentialId) {
    return {
      errorMsg: 'Failed to update credential',
    };
  }
  try {
    const updatedCredential = await db.webCredential.update({
      where: { id: credentialId },
      data: {
        user_email: encryptString(values.usernameOrEmail),
        site_url: values.siteUrl,
        password: encryptString(values.password),
        title: values.title,
      },
    });
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

export const deleteCredential = async (credentialId: string) => {
  try {
    if (!credentialId) {
      toFormState('ERROR', 'Credential id not found');
    }
    await db.webCredential.delete({
      where: { id: credentialId },
    });
    // return toFormState('SUCCESS', 'Credential deleted');
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  revalidatePath(paths.toWeb());
  setFlash({
    type: 'SUCCESS',
    message: 'Credential deleted',
    timestamp: Date.now(),
  });
  redirect(paths.toWeb());
};

export const markAsImportant = async (credentialId: string) => {
  if (!credentialId) {
    return toFormState('ERROR', 'Failed to update credential');
  }

  const existingCredential = await fetchWebCredentialById(credentialId);
  if (existingCredential?.errorMsg || !existingCredential?.webCredentialData) {
    return toFormState('ERROR', 'Failed to update credential');
  }

  try {
    await db.webCredential.update({
      where: { id: credentialId },
      data: {
        is_important: !existingCredential.webCredentialData.is_important,
      },
    });
  } catch (error) {
    fromErrorsToFormState(error);
  }
  revalidatePath(paths.toWeb());
  revalidatePath(paths.toWebItem(credentialId));
  revalidatePath(paths.toWebItemMobile(credentialId));

  return toFormState('SUCCESS', 'Credential updated');
};

const encryptString = (str: string): string => {
  const encryptedString = AES.encrypt(str, SALT_KEY).toString();
  return encryptedString;
};

'use server';

import { webCredentialFormSchema } from '@/lib/schema';
import { WebCredential } from '@prisma/client';
import { z } from 'zod';
import AES from 'crypto-js/aes';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import paths from '@/lib/paths';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

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
        userId: +userId,
      },
    });

    return {
      message: 'New credential added',
      webCredentialData: newWebCredentialData,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        errorMsg: 'Unable to add credential',
      };
    }
  }

  revalidatePath(paths.toWeb());
};

export const fetchAllWebCredentialsByUser = async (): Promise<
  AllWebCredentialsByUserResponse | undefined
> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      errorMsg: 'Unauthorized',
    };
  }
  try {
    const webCredentialsList = await db.webCredential.findMany({
      where: { userId: +session.user.userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      webCredentialData: webCredentialsList,
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
      console.log(error.message);
      return {
        errorMsg: 'Unable to retrieve data',
      };
    }
  }
};

export const fetchAllCredentials = async (): Promise<
  AllWebCredentialsByUserResponse | undefined
> => {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      throw new Error('Unauthorized');
    }

    const webData = await db.webCredential.findMany({
      where: { userId: +session?.user.userId },
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

export type State = {
  message?: string;
  errors?: null;
};

export const deleteCredential = async (
  credentialId: string,
  formState: State,
) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  if (!credentialId) {
    return {
      message: 'Failed to delete credential',
    };
  }

  try {
    await db.webCredential.delete({
      where: { id: credentialId },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        message: 'Unable to delete data',
      };
    }
  }
  revalidatePath(paths.toWeb());
  redirect(paths.toWeb());
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

const encryptString = (str: string): string => {
  const encryptedString = AES.encrypt(str, SALT_KEY).toString();
  return encryptedString;
};

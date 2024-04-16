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

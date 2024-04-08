'use server';

import { db } from '@/db';
import { profileFormSchema } from '@/lib/schema';
import { User } from '@prisma/client';

import { z } from 'zod';

interface UpdateProfileResponse {
  errorMsg?: string;
  message?: string;
  userData?: User;
}

export const updateProfile = async (
  values: z.infer<typeof profileFormSchema>,
  currenEmail: string,
  currentUsername: string,
): Promise<UpdateProfileResponse | undefined> => {
  try {
    const checkIfUsernameIsValid = await db.user.findUnique({
      where: { username: values.username },
      select: { username: true },
    });
    const checkIfEmailIsValid = await db.user.findUnique({
      where: { email: values.email },
      select: { email: true },
    });

    if (
      checkIfUsernameIsValid &&
      checkIfUsernameIsValid.username !== currentUsername
    ) {
      return {
        errorMsg: 'Username already exist',
      };
    }

    if (checkIfEmailIsValid && checkIfEmailIsValid.email !== currenEmail) {
      return { errorMsg: 'Email already exist' };
    }

    const userData = await db.user.update({
      where: {
        email: currenEmail,
      },
      data: {
        username: values.username,
        email: values.email,
      },
    });

    return {
      userData,
      message: 'Profile updated. Please login',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorMsg: 'Failed to update the profile',
      };
    }
  }
};

export const updateProfileImage = async (imageUrl: string, email: string) => {
  try {
    return await db.user.update({
      where: { email },
      data: { image_url: imageUrl },
      select: { image_url: true },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
};

export const finduserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
};

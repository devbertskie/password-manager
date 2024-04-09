'use server';

import { db } from '@/db';
import { credentialFormSchema, profileFormSchema } from '@/lib/schema';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';

import { z } from 'zod';

interface UserResponseUpdateTypes {
  errorMsg?: string;
  message?: string;
  userData?: User;
}

export const updateProfile = async (
  values: z.infer<typeof profileFormSchema>,
  currenEmail: string,
  currentUsername: string,
): Promise<UserResponseUpdateTypes | undefined> => {
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

// CHNANGE USER PASSWORD

export const changePassword = async (
  values: z.infer<typeof credentialFormSchema>,
  email: string,
): Promise<UserResponseUpdateTypes | undefined> => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return {
        errorMsg: 'User not found!',
      };
    }

    if (values.newPassword.trim() !== values.confirmPassword.trim()) {
      return {
        errorMsg: 'Paswsword must match!',
      };
    }

    const isPasswordValid = await compare(
      values.currentPassword,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return {
        errorMsg: 'Current password incorrect!',
      };
    }

    const newHashedPassword = await hash(values.newPassword, 10);

    const updatedUser = await db.user.update({
      where: { email },
      data: { password: newHashedPassword },
    });

    return {
      message: 'Credential updated!',
      userData: updatedUser,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        errorMsg: 'Failed to update credential',
      };
    }
  }
};

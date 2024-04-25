'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';

import { toFormState } from '@/helpers/to-form-state';
import { signIn, signOut } from '@/auth';
import { formLoginSchema, formRegisterSchema } from '@/lib/schema';
import { FormState } from '@/types';
import { hash } from 'bcrypt';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { createQueryString } from '@/helpers/create-query-string';
import paths from '@/lib/paths';

export const registerUser = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const schemaData = formRegisterSchema.safeParse(
      Object.fromEntries(formData),
    );

    if (!schemaData.success) {
      return fromErrorsToFormState(schemaData.error);
    }
    const { username, email, password } = schemaData.data;
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email, username }],
      },
    });

    if (existingUser) {
      return toFormState('ERROR', 'Username/Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return fromErrorsToFormState(error);
  }

  redirect(createQueryString(paths.toLogin(), 'registered', 'true'));
};

export const authorizeUser = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const schemaData = formLoginSchema.safeParse(Object.fromEntries(formData));

    if (!schemaData.success) {
      return fromErrorsToFormState(schemaData.error);
    }

    const { email, password } = schemaData.data;
    await signIn('credentials', {
      email,
      password,
      redirectTo: createQueryString(paths.toDashboard(), 'auth', 'true'),
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return fromErrorsToFormState(error);
  }
  return formState;
};

export const signOutUser = async () => {
  await signOut({
    redirectTo: createQueryString(paths.toLogin(), 'logout', 'true'),
  });
};

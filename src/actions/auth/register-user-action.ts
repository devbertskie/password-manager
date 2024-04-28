'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';
import { toFormState } from '@/helpers/to-form-state';
import { sendEmailVerification } from '@/lib/mail';
import paths from '@/lib/paths';
import { formRegisterSchema } from '@/lib/schema';
import { generateVerificationToken } from '@/lib/token';
import { deleteEmailVerificationById } from '@/query';
import { FormState } from '@/types';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';

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
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return toFormState('ERROR', 'Username/Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const createdUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!createdUser) {
      return toFormState('ERROR', "There's a probles creating you account");
    }

    const generatedToken = await generateVerificationToken(createdUser.email);
    // send to email
    const { error } = await sendEmailVerification(generatedToken);
    if (error) {
      // if there is error sending the token: FALLBACK
      // delete the current token
      await deleteEmailVerificationById(generatedToken.id);
      // delete the user
      await db.user.delete({
        where: { id: createdUser.id },
      });
      return toFormState('ERROR', 'Something went wrong. Sending the token');
    }
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  setFlash({
    type: 'SUCCESS',
    message: 'Account created🎉 Email sent for verification!',
    timestamp: Date.now(),
  });
  redirect(paths.toLogin());
};

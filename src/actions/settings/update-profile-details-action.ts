'use server';

import { setFlash } from '@/components/shared/feedback';
import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import { profileFormSchema } from '@/lib/schema';
import { z } from 'zod';
import paths from '@/lib/paths';
import { signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { sendEmailVerification } from '@/lib/mail';
import { deleteEmailVerificationById } from '@/query';
import { generateVerificationToken } from '@/lib/token';

export const updateProfile = async (
  values: z.infer<typeof profileFormSchema>,
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized');
    const { email, username } = values;

    const existingUsername = await db.user.findFirst({
      where: {
        username,
      },
    });
    const existingEmail = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (
      existingUsername &&
      existingUsername.username !== currentUser.username
    ) {
      setFlash({
        type: 'ERROR',
        message: 'username/email aready exist',
        timestamp: Date.now(),
      });
      return null;
    }

    if (existingEmail && existingEmail.email !== currentUser.email) {
      setFlash({
        type: 'ERROR',
        message: 'username/email aready exist',
        timestamp: Date.now(),
      });
      return null;
    }

    if (currentUser.email === email && currentUser.username === username) {
      setFlash({
        type: 'ERROR',
        message: 'Credential the same',
        timestamp: Date.now(),
      });
      return null;
    }

    const userData = await db.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        username,
        email,
        emailVerified:
          currentUser.email !== email ? null : existingEmail?.emailVerified,
      },
    });
    if (userData && !userData.emailVerified) {
      const generatedToken = await generateVerificationToken(userData.email);
      const { error } = await sendEmailVerification(generatedToken);
      if (error) {
        // in case resend server throw an error
        await deleteEmailVerificationById(generatedToken.id);
        setFlash({
          type: 'ERROR',
          message: 'Something went wrong: RESEND',
          timestamp: Date.now(),
        });
        return null;
      }
      setFlash({
        type: 'SUCCESS',
        message: 'Email sent for verification',
        timestamp: Date.now(),
      });
      await signOut({
        redirectTo: paths.toLogin(),
      });
    }
    return userData;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw new Error('Something went wrong');
  }
};

import { db } from '@/db';

import { EmailVerification } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
export const generateVerificationToken = async (email: string) => {
  const token = `${uuid4()}${email}`;
  const hashedToken = await hash(token, 10);
  // expire in 15 mins validaity
  const expiresAt = new Date(Date.now() + 900 * 1000);

  return await createToken(hashedToken, email, expiresAt);
};

export const isTokenExpire = (existingToken: EmailVerification): Boolean => {
  return new Date(existingToken.expiresAt) < new Date();
};

export const updateToken = async (existingToken: EmailVerification) => {
  const token = `${uuid4()}${existingToken.email}`;
  const hashedToken = await hash(token, 10);
  // expire in 15 mins validaity
  const expiresAt = new Date(Date.now() + 900 * 1000);

  return await db.emailVerification.update({
    where: { id: existingToken.id },
    data: {
      token: hashedToken,
      expiresAt,
      attempt: existingToken.attempt + 1,
    },
  });
};

const createToken = (token: string, email: string, expiresAt: Date) => {
  return db.emailVerification.create({
    data: {
      token,
      email,
      expiresAt,
    },
  });
};

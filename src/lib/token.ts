import { db } from '@/db';

import { EmailVerification, PasswordVerification } from '@prisma/client';
import { hash } from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
export const generateVerificationToken = async (email: string) => {
  const { hashedToken, expiresAt } = await createTokenSet(email);

  return db.emailVerification.create({
    data: {
      token: hashedToken,
      email,
      expiresAt,
    },
  });
};

export const isTokenExpire = (
  existingToken: EmailVerification | PasswordVerification,
): Boolean => {
  return new Date(existingToken.expiresAt) < new Date();
};

export const updateToken = async (existingToken: EmailVerification) => {
  const { hashedToken, expiresAt } = await createTokenSet(existingToken.email);

  return await db.emailVerification.update({
    where: { id: existingToken.id },
    data: {
      token: hashedToken,
      expiresAt,
      attempt: existingToken.attempt + 1,
    },
  });
};

export const updateForgotPasswordToken = async (
  existingToken: PasswordVerification,
) => {
  const { hashedToken, expiresAt } = await createTokenSet(existingToken.email);

  return await db.passwordVerification.update({
    where: { id: existingToken.id },
    data: {
      token: hashedToken,
      expiresAt,
      attempt: existingToken.attempt + 1,
    },
  });
};

// FORGOT PASSWORD

export const generatePasswordToken = async (email: string) => {
  const { hashedToken, expiresAt } = await createTokenSet(email);
  return db.passwordVerification.create({
    data: {
      token: hashedToken,
      email,
      expiresAt,
    },
  });
};

const createTokenSet = async (email: string) => {
  const token = `${uuid4()}${email}`;
  const hashedToken = await hash(token, 10);
  // expire in 15 mins validity
  const expiresAt = new Date(Date.now() + 900 * 1000);

  return { hashedToken, expiresAt };
};

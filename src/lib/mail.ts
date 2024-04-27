import { createQueryString } from '@/helpers/create-query-string';
import { EmailVerification, PasswordVerification } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (
  verification: EmailVerification,
) => {
  const query = createQueryString('/verify', 'token', verification.token);
  const emailVerificationLink = `${process.env.BASE_URL}${query}`;

  return await resend.emails.send({
    from: 'PassDB <onboarding@resend.dev>',
    to: verification.email,
    subject: 'Verify your account',
    html: `<p>Click  <a target="_blank" href=${emailVerificationLink}>Here</a> </p>`,
  });
};

export const sendForgotPasswordVerification = async (
  passwordVerification: PasswordVerification,
) => {
  const query = createQueryString(
    '/reset-password',
    'token',
    passwordVerification.token,
  );
  const emailVerificationLink = `${process.env.BASE_URL}${query}`;

  return await resend.emails.send({
    from: 'PassDB <onboarding@resend.dev>',
    to: passwordVerification.email,
    subject: 'Reset your password',
    html: `<p>Click  <a target="_blank" href=${emailVerificationLink}>Here</a> to reset your password </p>`,
  });
};

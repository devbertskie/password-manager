import { createQueryString } from '@/helpers/create-query-string';
import { EmailVerification } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailverification = async (
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

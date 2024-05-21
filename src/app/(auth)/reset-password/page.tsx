import ResetPasswordForm from '@/components/pages/auth/reset-password-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Reset Password',
};

interface ResetPasswordPageProps {
  searchParams: {
    token: string;
  };
}

const ResetPasswordPage = ({ searchParams }: ResetPasswordPageProps) => {
  if (!searchParams.token) return notFound();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;

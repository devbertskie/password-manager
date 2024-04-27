import ResetPasswordForm from '@/components/pages/auth/reset-password-form';
import { notFound } from 'next/navigation';
import React from 'react';

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

import React from 'react';
import ForgotPasswordForm from '@/components/pages/auth/forgot-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;

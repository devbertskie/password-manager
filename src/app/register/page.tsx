import React from 'react';

import RegisterForm from '@/components/pages/auth/register-form';

import { redirect } from 'next/navigation';

import paths from '@/lib/paths';
import { auth } from '@/lib/auth';

const RegisterPage = async () => {
  const session = await auth();

  if (session) {
    redirect(paths.toDashboard());
  }

  return (
    <div className="flex h-full min-h-screen items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

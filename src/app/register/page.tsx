import React from 'react';

import RegisterForm from '@/components/pages/auth/register-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import paths from '@/lib/paths';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

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

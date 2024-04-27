import React from 'react';

import { redirect } from 'next/navigation';

import paths from '@/lib/paths';
import LoginForm from '@/components/pages/auth/login-form';
import { auth } from '@/auth';

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect(paths.toDashboard());
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* form login */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;

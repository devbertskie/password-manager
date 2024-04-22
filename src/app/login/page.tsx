import React from 'react';

import { redirect } from 'next/navigation';

import paths from '@/lib/paths';
import LoginForm from '@/components/pages/auth/login-form';
import { auth } from '@/lib/auth';

const LoginPage = async () => {
  const userSession = await auth();

  if (userSession) {
    redirect(paths.toDashboard());
  }

  return (
    <div className="flex size-full h-full min-h-screen items-center justify-center">
      {/* form login */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;

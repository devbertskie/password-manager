import React from 'react';
import LoginForm from './login-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import paths from '@/lib/paths';

const LoginPage = async () => {
  const userSession = await getServerSession(authOptions);

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

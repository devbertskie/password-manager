import React from 'react';
import LoginForm from './login-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

const LoginPage = async () => {
  const userSession = await getServerSession(authOptions);
  console.log(userSession);

  if (userSession) {
    redirect('/dashboard');
  }

  return (
    <div className="flex size-full items-center justify-center">
      {/* form login */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;

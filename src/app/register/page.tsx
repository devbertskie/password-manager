import React from 'react';
import RegisterForm from './register-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex size-full items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

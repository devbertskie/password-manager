import VerificationForm from '@/components/pages/auth/verification-form';
import { notFound } from 'next/navigation';
import React from 'react';

interface VerifyPageProps {
  searchParams: {
    token: string;
  };
}

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  if (!searchParams.token) {
    return notFound();
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <VerificationForm />
    </div>
  );
}

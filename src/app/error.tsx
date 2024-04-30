'use client';
import ErrorPage from '@/components/shared/error';
import React from 'react';

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ErrorPage error={error} reset={reset} />
    </div>
  );
};

export default Error;

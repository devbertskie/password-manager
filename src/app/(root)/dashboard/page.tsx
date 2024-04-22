import RedirectMessage from '@/components/pages/auth/redirect-message';
import { auth } from '@/lib/auth';
import paths from '@/lib/paths';
import { redirect } from 'next/navigation';
import React from 'react';

interface DashboardPageProps {
  searchParams: {
    auth: string;
  };
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth();

  if (!session) {
    redirect(paths.toLogin());
  }

  const isAuthenticated = Boolean(searchParams.auth);
  return (
    <>
      {isAuthenticated && (
        <RedirectMessage
          type="SUCCESS"
          message={`Welcome back 🎉 ${session.user.username.toLowerCase()}`}
        />
      )}
      <h1>Dashboards</h1>
    </>
  );
};

export default DashboardPage;

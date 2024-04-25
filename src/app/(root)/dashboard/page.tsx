import { auth } from '@/auth';
import paths from '@/lib/paths';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect(paths.toLogin());
  }

  return (
    <>
      <h1>Dashboards</h1>
    </>
  );
};

export default DashboardPage;

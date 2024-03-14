import SignOutButton from '@/components/shared/signed-out';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

const DashboardPage = async () => {
  const userSession = await getServerSession(authOptions);
  return (
    <div>
      Welcome to Passord Manager {userSession?.user.username}
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;

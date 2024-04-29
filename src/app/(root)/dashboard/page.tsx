import { getCurrentUser } from '@/lib/current-user';

import React from 'react';

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <h1>Dashboards</h1>
    </>
  );
};

export default DashboardPage;

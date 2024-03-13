"use client";

import useAuth from "@/hooks/use-auth";
import AuthenticationPage from "@/pages/authentication";
import DashboardPage from "@/pages/dashboard";

export default function Home() {
  const { auth } = useAuth();
  return auth.isAuthorized ? <DashboardPage /> : <AuthenticationPage />;
}

import { redirect } from 'next/navigation';
import paths from '@/lib/paths';
import { auth } from '@/auth';
import LoginPage from '@/app/(auth)/login/page';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect(paths.toDashboard());
  }
  return <LoginPage />;
}

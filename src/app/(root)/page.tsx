import { redirect } from 'next/navigation';
import paths from '@/lib/paths';
import LoginPage from '@/app/login/page';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect(paths.toDashboard());
  }
  return <LoginPage />;
}

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import paths from '@/lib/paths';
import LoginPage from './login/page';

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect(paths.toDashboard());
  }
  return <LoginPage />;
}

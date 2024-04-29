import { fetchCredentialById } from '@/actions';
import WebCredentialWrapper from '@/components/pages/web/web-credential-wrapper';
import { notFound } from 'next/navigation';

interface WebPreviewPageProps {
  params: {
    id: string;
  };
}

const WebPreviewPage = async ({ params }: WebPreviewPageProps) => {
  const webCredential = await fetchCredentialById(params.id);
  if (!webCredential) return notFound();
  return <WebCredentialWrapper webCredential={webCredential} />;
};

export default WebPreviewPage;

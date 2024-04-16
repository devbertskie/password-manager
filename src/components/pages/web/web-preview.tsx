import { fetchWebCredentialById } from '@/actions';
import WebCredentialWrapper from '@/components/pages/web/web-credential-wrapper';

interface WebPreviewPageProps {
  params: {
    id?: string | undefined;
  };
}

const WebPreviewPage = async ({ params }: WebPreviewPageProps) => {
  const webCredential = await fetchWebCredentialById(params.id!);

  return <WebCredentialWrapper webCredentialResponse={webCredential!} />;
};

export default WebPreviewPage;

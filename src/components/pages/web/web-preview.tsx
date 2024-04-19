import { fetchWebCredentialById } from '@/actions';
import WebCredentialWrapper from '@/components/pages/web/web-credential-wrapper';
import paths from '@/lib/paths';
import { permanentRedirect } from 'next/navigation';

interface WebPreviewPageProps {
  params: {
    id?: string | undefined;
  };
}

const WebPreviewPage = async ({ params }: WebPreviewPageProps) => {
  const webCredential = await fetchWebCredentialById(params.id!);
  if (
    !webCredential ||
    webCredential.errorMsg ||
    !webCredential.webCredentialData
  ) {
    permanentRedirect(paths.toWeb());
  }

  return (
    <WebCredentialWrapper webCredential={webCredential.webCredentialData} />
  );
};

export default WebPreviewPage;

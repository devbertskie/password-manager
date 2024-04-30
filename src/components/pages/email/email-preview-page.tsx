import React from 'react';
import { fetchEmailCredentialById } from '@/actions';
import { notFound } from 'next/navigation';
import EmailCredentialWrapper from '@/components/pages/email/email-credential-wrapper';

interface EmailPreviewPageProps {
  params: {
    id: string;
  };
}

export default async function EmailPreviewPage({
  params,
}: EmailPreviewPageProps) {
  const emailCredential = await fetchEmailCredentialById(params.id);
  if (!emailCredential) return notFound();
  return <EmailCredentialWrapper emailCredential={emailCredential} />;
}

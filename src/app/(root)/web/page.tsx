import RedirectMessage from '@/components/pages/auth/redirect-message';
import WebMobileCardWrapper from '@/components/pages/web/mobile/web-mobile-wrapper';
import { WebItemSkeleton } from '@/components/pages/web/web-loading-skeleton';

import { Info } from 'lucide-react';
import React, { Suspense } from 'react';

interface WebCredentialsPageProps {
  searchParams: {
    deleted: string;
  };
}

const WebCredentialsPage = ({ searchParams }: WebCredentialsPageProps) => {
  const isDeleted = Boolean(searchParams.deleted);
  return (
    <>
      {isDeleted && (
        <RedirectMessage type="SUCCESS" message="Credential deleted 🎉" />
      )}
      <div>
        <div className="hidden h-full flex-col items-center justify-center space-y-3 md:flex">
          <Info className="size-16 text-primary/40" />
          <h1 className="font-space text-xl leading-4 text-muted-foreground/70">
            Please select credential to preview!
          </h1>
        </div>

        <div className="no-scrollbar max-h-[calc(100vh_-_21rem)] overflow-y-scroll md:hidden ">
          <Suspense fallback={<WebItemSkeleton count={10} />}>
            <WebMobileCardWrapper />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default WebCredentialsPage;

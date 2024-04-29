import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import WebMobileCardWrapper from '@/components/pages/web/mobile/web-mobile-wrapper';

import { Info } from 'lucide-react';
import React, { Suspense } from 'react';

const WebCredentialsPage = () => {
  return (
    <div>
      <div className="hidden flex-col items-center justify-center space-y-3 md:flex">
        <Info className="size-16 text-primary/40 opacity-70" />
        <h1 className="font-space text-sm text-muted-foreground/70">
          Please select credential to preview!
        </h1>
      </div>

      <div className="no-scrollbar max-h-[calc(100vh_-_21rem)] overflow-y-scroll md:hidden ">
        <Suspense fallback={<SideItemSkeleton count={10} />}>
          <WebMobileCardWrapper />
        </Suspense>
      </div>
    </div>
  );
};

export default WebCredentialsPage;

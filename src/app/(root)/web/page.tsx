import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import WebMobileCardWrapper from '@/components/pages/web/mobile/web-mobile-wrapper';
import PreviewPlaceholder from '@/components/shared/preview-placeholder';
import React, { Suspense } from 'react';

const WebCredentialsPage = () => {
  return (
    <div>
      <PreviewPlaceholder label="Please select web credential to preview!" />

      <div className="no-scrollbar max-h-[calc(100vh_-_21rem)] overflow-y-scroll md:hidden ">
        <Suspense fallback={<SideItemSkeleton count={10} />}>
          <WebMobileCardWrapper />
        </Suspense>
      </div>
    </div>
  );
};

export default WebCredentialsPage;

import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import PreviewPlaceholder from '@/components/shared/preview-placeholder';
import React, { Suspense } from 'react';

const EmailCredentialsPage = () => {
  return (
    <div>
      <PreviewPlaceholder label="Please select email credential to preview!" />

      <div className="no-scrollbar max-h-[calc(100vh_-_21rem)] overflow-y-scroll md:hidden ">
        <Suspense fallback={<SideItemSkeleton count={10} />}>
          {/* <WebMobileCardWrapper /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default EmailCredentialsPage;

import React, { Suspense } from 'react';

import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import PreviewPlaceholder from '@/components/shared/preview-placeholder';

const EmailCredentialsPage = () => {
  return (
    <div>
      <PreviewPlaceholder label="Please select note to preview!" />

      <div className="no-scrollbar max-h-[calc(100vh_-_21rem)] overflow-y-scroll md:hidden ">
        <Suspense fallback={<SideItemSkeleton count={10} />}>
          {/* <EmailMobileCardWrapper /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default EmailCredentialsPage;

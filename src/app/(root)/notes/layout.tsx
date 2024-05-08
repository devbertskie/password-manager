import NoteList from '@/components/pages/note/note-list';
import NoteNewForm from '@/components/pages/note/note-new-form';
import FeatureHeader from '@/components/pages/shared/feature-header';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import LayoutPager from '@/components/shared/layout-pager';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode, Suspense } from 'react';

interface EmailCredentialLayoutProps {
  children: ReactNode;
}

const NotesLayout = ({ children }: EmailCredentialLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager type="Note" />
      <div className="rounded-md border border-border p-6">
        <FeatureHeader title="Notes" label="Manage all notes">
          <NoteNewForm />
        </FeatureHeader>
        <Separator className="my-6" />

        <div className="hidden space-x-6 md:flex">
          {/* sidenav hear */}
          <FeatureSidenav>
            <Suspense fallback={<SideItemSkeleton count={8} />}>
              <NoteList />
            </Suspense>
          </FeatureSidenav>
          <div className="flex-1">{children}</div>
        </div>
        <div className="md:hidden">{children}</div>
      </div>
    </div>
  );
};

export default NotesLayout;

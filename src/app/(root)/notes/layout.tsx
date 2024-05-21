import React, { ReactNode, Suspense } from 'react';
import NoteList from '@/components/pages/note/note-list';
import NoteNewForm from '@/components/pages/note/note-new-form';
import NotePagination from '@/components/pages/note/note-pagination';
import FeatureHeader from '@/components/pages/shared/feature-header';
import FeatureSidenav from '@/components/pages/shared/feature-sidenav';
import SideItemSkeleton from '@/components/pages/shared/side-item-skeleton';
import LayoutPager from '@/components/shared/layout-pager';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
};

interface EmailCredentialLayoutProps {
  children: ReactNode;
}

const NotesLayout = ({ children }: EmailCredentialLayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-6 pb-16 md:p-10">
      <LayoutPager type="Note" />
      <Card>
        <CardContent className="p-4">
          <FeatureHeader title="Notes" label="Manage all notes">
            <NoteNewForm />
          </FeatureHeader>
          <Separator className="my-6" />

          <div className="hidden space-x-6 md:flex">
            {/* sidenav hear */}
            <FeatureSidenav>
              <Suspense fallback={<SideItemSkeleton count={10} />}>
                <NoteList />
              </Suspense>
            </FeatureSidenav>
            <div className="flex-1">{children}</div>
          </div>
          <div className="md:hidden">{children}</div>
        </CardContent>
        <NotePagination />
      </Card>
    </div>
  );
};

export default NotesLayout;

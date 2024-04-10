'use client';

import MainAside from '@/components/pages/web/main-aside';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

const WebCredentialsRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto w-full max-w-6xl p-10 pb-16">
      <div className="rounded-md border border-border p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-2xl font-bold tracking-wider">
              Web Credentials
            </h3>
            <p className="text-muted-foreground">Manage your web credentials</p>
          </div>
          {/* for modal */}
          <Button className="flex items-center space-x-1 bg-primary/10 text-primary hover:bg-primary/10 hover:text-muted-foreground">
            <Plus className="w-4" />
            <span> New Credential</span>
          </Button>
        </div>
        <Separator className="my-6" />

        <MainAside>{children}</MainAside>
      </div>
    </div>
  );
};

export default WebCredentialsRootLayout;

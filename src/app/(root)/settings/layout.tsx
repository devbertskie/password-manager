import { Separator } from '@/components/ui/separator';
import React, { PropsWithChildren } from 'react';
import SidebarNav from './components/sidebar-nav';
import { SETTINGS_LIST } from '@/constants';

const SettingsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full space-y-6  p-10 pb-16 lg:mx-auto lg:max-w-4xl">
      <div className="rounded-md border border-border p-6">
        {/* start header */}
        <div className="space-y-0.5">
          <h3 className="text-2xl font-bold tracking-wider">Settings</h3>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
        <Separator className="my-6" />
        {/* end header */}

        {/* layout */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={SETTINGS_LIST} />
          </aside>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;

'use client';
import ThemeProvider from '@/components/shared/theme-provider';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import NotificationProvider from './notification-context';

interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps>(undefined!);

const AppProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const initialValue: SidebarContextProps = {
    isSidebarOpen,
    toggleSidebar: handleToggleSidebar,
  };

  return (
    <SidebarContext.Provider value={initialValue}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <NotificationProvider>{children}</NotificationProvider>
      </ThemeProvider>
    </SidebarContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('Use App must be in the App Context Provider!');
  }

  return ctx;
};

export default AppProvider;

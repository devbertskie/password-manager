'use client';
import ThemeProvider from '@/components/shared/theme-provider';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

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
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          autoHideDuration={1500}
          maxSnack={2}
        >
          {children}
        </SnackbarProvider>
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

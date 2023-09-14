import { createContext, useContext, useState } from 'react';

import { useFakeDelay } from '../hooks/use-fake-delay';

const Core = createContext(
  {} as {
    isUserMenuDrawerOpen: boolean;
    openUserMenuDrawer: () => void;
    closeUserMenuDrawer: () => void;
    toggleUserMenuDrawer: () => void;
    isFakeDelayLoading: boolean;
  },
);

type CoreProviderProps = {
  children: React.ReactNode;
};

export function CoreProvider({ children }: CoreProviderProps) {
  const isFakeDelayLoading = useFakeDelay();
  const [isUserMenuDrawerOpen, setIsUserMenuDrawerOpen] = useState<boolean>(false);

  /* User Menu Drawer */
  function openUserMenuDrawer() {
    setIsUserMenuDrawerOpen(true);
  }
  function closeUserMenuDrawer() {
    setIsUserMenuDrawerOpen(false);
  }

  function toggleUserMenuDrawer() {
    setIsUserMenuDrawerOpen(prevState => !prevState);
  }

  return (
    <Core.Provider
      value={{
        isUserMenuDrawerOpen,
        closeUserMenuDrawer,
        openUserMenuDrawer,
        toggleUserMenuDrawer,
        isFakeDelayLoading,
      }}
    >
      {children}
    </Core.Provider>
  );
}

export const useCore = () => {
  const context = useContext(Core);
  if (!context) {
    throw new Error('useCore must be used within a CoreProvider');
  }
  return context;
};

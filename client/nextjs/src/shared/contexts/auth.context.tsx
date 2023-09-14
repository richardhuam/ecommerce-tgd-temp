import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

import { EmptyUserState, IUser } from '../models/account.model';
import { ISession } from '../models/auth.model';

const AuthContext = createContext(
  {} as {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    me: IUser;
    setMe: Dispatch<SetStateAction<IUser>>;
    openUserMenu: () => void;
    closeUserMenu: () => void;
    isUserMenuOpen: boolean;
    cleanUserData: () => void;
  },
);

interface AuthProviderProps {
  children: ReactNode;
  session: ISession;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(session.isAuthenticated);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [me, setMe] = useState<IUser>(session.userData ?? EmptyUserState);

  function cleanUserData() {
    setMe(EmptyUserState);
  }

  const openUserMenu = () => setIsUserMenuOpen(true);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  useEffect(() => {
    if (session.isAuthenticated) {
      setMe(session.userData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, openUserMenu, closeUserMenu, isUserMenuOpen, me, setMe, cleanUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import React, { FC, ReactNode } from 'react';

import Logo from '../ui/logo';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main>
      <header className="w-full z-navbar fixed top-0 bg-white flex items-center justify-center h-[60px] xl:h-[72px]">
        <Logo />
      </header>
      <div className="h-screen bg-[#F6F6F6]">
        <div className="main-container h-full flex items-center justify-center">{children}</div>
      </div>
    </main>
  );
};

export default AuthLayout;

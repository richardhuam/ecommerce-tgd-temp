import React, { FC, ReactNode } from 'react';

import Footer from '../navigation/footer/footer';
import Navbar from '../navigation/navbar/navbar';

type PrimaryLayout = {
  children: ReactNode;
};

const PrimaryLayout: FC<PrimaryLayout> = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </main>
  );
};

export default PrimaryLayout;

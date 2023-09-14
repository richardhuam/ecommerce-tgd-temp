import React, { FC, ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  container?: boolean;
  hasPadding?: boolean;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, container = true, hasPadding = true }) => {
  return <div className={`space-y-6 lg:space-y-6 ${container ? 'main-container' : ''} ${hasPadding ? 'py-6' : ''}`}>{children}</div>;
};

export default PageWrapper;

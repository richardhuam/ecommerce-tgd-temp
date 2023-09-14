import cn from 'classnames';
import React, { forwardRef, HTMLProps, ReactNode } from 'react';

interface PaperProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  padding?: 'custom' | 'none' | 'sm' | 'md' | 'lg';
}

const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const { children, className, padding = 'md', ...rest } = props;
  return (
    <div
      {...rest}
      ref={ref}
      className={cn(
        `${
          padding === 'none'
            ? 'p-0'
            : padding === 'sm'
            ? 'p-2 sm:p-3 lg:p-4'
            : padding === 'md'
            ? 'p-4 sm:p-6 lg:p-8'
            : padding === 'lg'
            ? 'p-4 sm:p-6 lg:p-10'
            : ''
        } bg-white rounded-md w-full`,
        className,
      )}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

export default Paper;

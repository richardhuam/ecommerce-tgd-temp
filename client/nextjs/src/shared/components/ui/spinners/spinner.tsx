import cn from 'classnames';
import React, { forwardRef, HTMLProps } from 'react';

type SpinnerProps = {
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl'; // Renamed to spinnerSize
};

interface SpinnerWithTextProps extends HTMLProps<HTMLDivElement>, SpinnerProps {
  text?: string;
}
export function Spinner({ spinnerSize = 'sm' }: SpinnerProps) {
  return (
    <div>
      <svg
        className={`${
          spinnerSize === 'sm' ? 'h-6 w-6' : spinnerSize === 'md' ? 'h-10 w-10' : spinnerSize === 'lg' ? 'w-12 h-12' : 'w-16 h-16'
        } animate-spin stroke-gray-500`}
        viewBox="0 0 256 256"
      >
        <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
      </svg>
    </div>
  );
}

export const SpinnerWithText = forwardRef<HTMLDivElement, SpinnerWithTextProps>((props, ref) => {
  const { className, text = 'Loading...', spinnerSize = 'sm', ...rest } = props;
  return (
    <div {...rest} ref={ref} className={cn('w-full flex items-center space-x-2', className)}>
      <svg
        className={`${
          spinnerSize === 'sm' ? 'h-6 w-6' : spinnerSize === 'md' ? 'h-10 w-10' : spinnerSize === 'lg' ? 'w-12 h-12' : 'w-16 h-16'
        } animate-spin stroke-gray-500`}
        viewBox="0 0 256 256"
      >
        <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
      </svg>
      <span className="text-xs font-medium text-gray-500">{text}</span>
    </div>
  );
});

SpinnerWithText.displayName = 'SpinnerWithText';

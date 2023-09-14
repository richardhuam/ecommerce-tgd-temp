import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg';
  bgColor?: string;
  textColor?: string;
  children: ReactNode;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ className, size, textColor, children, bgColor, ...props }, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={classNames(`${className} bg-${bgColor} text-${textColor}`, {
        'text-sm': size === 'sm',
        'text-md': size === 'md',
        'text-xl': size === 'lg',
      })}
    >
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export default Paragraph;

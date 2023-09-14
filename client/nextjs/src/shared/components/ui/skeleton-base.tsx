import cn from 'classnames';
import React, { HTMLAttributes } from 'react';

export default function SkeletonBase({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} {...props} />;
}

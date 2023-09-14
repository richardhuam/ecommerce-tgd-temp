import cn from 'classnames';
import Link from 'next/link';
import React, { AnchorHTMLAttributes, FC } from 'react';

import { routes } from '@/config/routes';

const Logo: FC<AnchorHTMLAttributes<{}>> = ({ className, href = routes.home, ...props }) => {
  return (
    <Link href={href} className={cn('font-bold text-20 md:text-24', className)} {...props}>
      <span className="text-gray-700">ECOM</span>
      <span className="text-primary">ERCE</span>
    </Link>
  );
};

export default Logo;

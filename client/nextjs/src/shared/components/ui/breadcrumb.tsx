import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';

import { routes } from '@/config/routes';

interface BreadcrumbProps {
  title: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title = 'NO_TITLE_FOUND' }) => {
  return (
    <div>
      <h1 className="text-24 md:text-28 lg:mb-2 lg:text-32 font-medium">{title}</h1>
      <div className="flex items-center justify-start gap-3 text-gray-500">
        <Link href={routes.home}>
          <span className="text-17 hover:text-primary ease-in-out transition-colors">
            <AiOutlineHome />
          </span>
        </Link>
        <div>
          <span className="text-15">
            <BsChevronRight />
          </span>
        </div>
        <div>
          <p className="uppercase text-14 leading-none">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

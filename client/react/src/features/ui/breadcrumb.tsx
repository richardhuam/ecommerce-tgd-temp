import { STORE_ROUTES } from '@/config/routes.config';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

type BreadcrumbProps = {
  title: string;
};

export default function Breadcrumb({ title = 'TITLE_NOT_SET' }: BreadcrumbProps) {
  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to={STORE_ROUTES.HOME}
            className="inline-flex items-center text-sm gap-2 text-gray-700 hover:text-primary"
          >
            <Home size={16} className="text-icon" />
            Home
          </Link>
        </li>
        <ChevronRight size={16} strokeWidth={1.9} className="text-icon" />
        <li aria-current="page">
          <span className="text-sm text-gray-500">{title}</span>
        </li>
      </ol>
    </nav>
  );
}

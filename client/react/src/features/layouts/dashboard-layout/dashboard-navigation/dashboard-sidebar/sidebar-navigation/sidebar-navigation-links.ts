import { DASHBOARD_ROUTES } from '@/config/routes.config';
import { LayoutDashboard, FileInput, LucideIcon, PackageSearch } from 'lucide-react';

export interface IDashboardNavbarSubLink {
  title: string;
  path: string;
}

export interface IDashboardNavbarLink extends IDashboardNavbarSubLink {
  icon: LucideIcon;
  subs: IDashboardNavbarSubLink[];
}

export const SIDEBAR_NAVBAR_LINKS: IDashboardNavbarLink[] = [
  {
    path: DASHBOARD_ROUTES.OVERVIEW,
    title: 'Overview',
    icon: LayoutDashboard,
    subs: [],
  },
  {
    path: DASHBOARD_ROUTES.INVOICE.INDEX,
    title: 'Invoice',
    icon: FileInput,
    subs: [
      {
        path: DASHBOARD_ROUTES.INVOICE.LIST,
        title: 'List all',
      },
      {
        path: DASHBOARD_ROUTES.INVOICE.ADD,
        title: 'Add new',
      },
    ],
  },
  {
    path: DASHBOARD_ROUTES.PRODUCTS.INDEX,
    title: 'Products',
    icon: PackageSearch,
    subs: [
      {
        path: DASHBOARD_ROUTES.PRODUCTS.LIST,
        title: 'List all',
      },
      {
        path: DASHBOARD_ROUTES.PRODUCTS.ADD,
        title: 'Add new',
      },
    ],
  },
];

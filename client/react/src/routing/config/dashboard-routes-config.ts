import { lazy } from 'react';
import { ROLES } from '@/constants/roles.constant';
import { DASHBOARD_ROUTES } from '@/config/routes.config';
import DashboardLayout from '@/features/layouts/dashboard-layout/dashboard-layout';
import { IDashboardRoutes } from '../interfaces/dashboard-routes.interface';

// All dashboard pages
const page = {
  index: lazy(() => import('@/pages/dashboard/overview/overview.page')),
  invoice: {
    index: lazy(() => import('@/pages/dashboard/invoice/invoice.page')),
    list: lazy(() => import('@/pages/dashboard/invoice/list/invoice-list.page')),
    details: lazy(() => import('@/pages/dashboard/invoice/details/invoice-details.page')),
  },
};

export const DASHBOARD_ROUTES_CONFIG: IDashboardRoutes[] = [
  {
    path: DASHBOARD_ROUTES.OVERVIEW,
    component: page.index,
    layout: DashboardLayout,
    roles: [ROLES.ADMIN],
  },
  {
    path: DASHBOARD_ROUTES.INVOICE.INDEX,
    component: page.invoice.index,
    layout: DashboardLayout,
    roles: [ROLES.ADMIN],
    subs: [
      {
        path: DASHBOARD_ROUTES.INVOICE.LIST,
        component: page.invoice.list,
        layout: DashboardLayout,
        roles: [],
      },
      {
        path: DASHBOARD_ROUTES.INVOICE.DETAILS,
        component: page.invoice.details,
        layout: DashboardLayout,
        roles: [],
      },
    ],
  },
];

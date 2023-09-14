import { ROLES } from '@/constants/roles.constant';

export interface IBaseRoute {
  path: string;
  component: React.LazyExoticComponent<React.FC> | React.FC;
}

export interface IDashboardSubRoute extends IBaseRoute {
  layout: ({ children }: { children: React.ReactNode }) => JSX.Element | JSX.Element[];
  roles: ROLES[];
}

export interface IDashboardRoutes extends IDashboardSubRoute {
  subs?: IDashboardSubRoute[];
}

import { IBaseRoute } from './dashboard-routes.interface';

/* Store Route Type */
export interface IStoreSubRoute extends IBaseRoute {
  layout: (({ children }: { children: React.ReactNode }) => JSX.Element | JSX.Element[]) | null;
}

export interface IStoreRoute extends IStoreSubRoute {
  subs?: IStoreSubRoute[];
}

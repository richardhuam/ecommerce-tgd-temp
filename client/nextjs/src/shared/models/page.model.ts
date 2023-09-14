import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

import { ISession } from './auth.model';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

type PageProps = any;

export interface IPageProps extends PageProps {
  dehydratedState: unknown;
  session: ISession;
}

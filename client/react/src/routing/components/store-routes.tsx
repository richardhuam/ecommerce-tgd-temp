/* eslint-disable no-prototype-builtins */
import { Fragment, Suspense, memo, useMemo } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './routes-with-not-found';
import { isPageFunctionalComponent, removePathPrefix } from '../utils/routing.utils';
import PageTransition from '@/features/layouts/page-transition';
import FullScreenLoader from '@/features/ui/full-screen-loader';
import { STORE_ROUTES } from '@/config/routes.config';
import { IStoreRoute, IStoreSubRoute } from '../interfaces/store-routes.interface';
import { STORE_ROUTES_CONFIG } from '../config/store-routes.config';

function StoreRoutes() {
  function resolveStoreRoute(route: IStoreRoute) {
    if (route.layout === null) {
      if (!isPageFunctionalComponent(route.component)) {
        return (
          <Suspense fallback={<FullScreenLoader />}>
            <route.component />
          </Suspense>
        );
      } else {
        return <route.component />;
      }
    } else {
      if (!isPageFunctionalComponent(route.component)) {
        return (
          <route.layout>
            <Suspense fallback={<FullScreenLoader />}>
              <PageTransition>
                <route.component />
              </PageTransition>
            </Suspense>
          </route.layout>
        );
      } else {
        return (
          <route.layout>
            <PageTransition>
              <route.component />
            </PageTransition>
          </route.layout>
        );
      }
    }
  }
  function resolveStoreSubRoute(subRoute: IStoreSubRoute) {
    if (subRoute.layout === null) {
      if (!isPageFunctionalComponent(subRoute.component)) {
        return (
          <Suspense fallback={<FullScreenLoader />}>
            <subRoute.component />
          </Suspense>
        );
      } else {
        return <subRoute.component />;
      }
    } else {
      if (!isPageFunctionalComponent(subRoute.component)) {
        return (
          <subRoute.layout>
            <Suspense fallback={<FullScreenLoader />}>
              <subRoute.component />
            </Suspense>
          </subRoute.layout>
        );
      } else {
        return (
          <subRoute.layout>
            <subRoute.component />
          </subRoute.layout>
        );
      }
    }
  }

  const MAPPED_STORE_ROUTES = useMemo(() => {
    return STORE_ROUTES_CONFIG?.map(route => {
      return (
        <Fragment key={route.path}>
          <Route path={removePathPrefix(route.path, STORE_ROUTES.INDEX)} element={resolveStoreRoute(route)} />
          {route.subs?.map(sub => (
            <Fragment key={sub.path}>
              <Route path={removePathPrefix(sub.path, STORE_ROUTES.INDEX)} element={resolveStoreSubRoute(sub)} />
            </Fragment>
          ))}
        </Fragment>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={STORE_ROUTES.HOME} />} />
      {MAPPED_STORE_ROUTES}
    </RoutesWithNotFound>
  );
}

export default memo(StoreRoutes);

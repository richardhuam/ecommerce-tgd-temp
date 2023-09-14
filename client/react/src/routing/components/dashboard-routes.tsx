import { Fragment, Suspense, memo, useMemo } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './routes-with-not-found';
import DashboardLayout from '@/features/layouts/dashboard-layout/dashboard-layout';
import { DASHBOARD_ROUTES } from '@/config/routes.config';
import DashboardFullScreenLoader from '@/features/ui/dashboard-full-screen-loader';
import { DASHBOARD_ROUTES_CONFIG } from '../config/dashboard-routes-config';
import RoleGuard from '../guards/role-guard';
import { removePathPrefix } from '../utils/routing.utils';

function DashboardRoutes() {
  const MAPPED_DASHBOARD_ROUTES = useMemo(() => {
    return DASHBOARD_ROUTES_CONFIG?.map(route => {
      return (
        /* Load dashboard routes */
        <Fragment key={route.path}>
          <Route element={<RoleGuard allowedRoles={route.roles} />}>
            <Route
              path={removePathPrefix(route.path, DASHBOARD_ROUTES.INDEX)}
              element={
                <DashboardLayout>
                  <Suspense fallback={<DashboardFullScreenLoader />}>
                    <route.component />
                  </Suspense>
                </DashboardLayout>
              }
            />
          </Route>
          {/* Load dashboard sub routes */}
          {route.subs?.map(sub => (
            <Fragment key={sub.path}>
              <Route element={<RoleGuard allowedRoles={route.roles} />}>
                <Route
                  path={removePathPrefix(sub.path, DASHBOARD_ROUTES.INDEX)}
                  element={
                    <DashboardLayout>
                      <Suspense fallback={<DashboardFullScreenLoader />}>
                        <sub.component />
                      </Suspense>
                    </DashboardLayout>
                  }
                />
              </Route>
            </Fragment>
          ))}
        </Fragment>
      );
    });
  }, []);

  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={DASHBOARD_ROUTES.OVERVIEW} />} />
      {MAPPED_DASHBOARD_ROUTES}
    </RoutesWithNotFound>
  );
}

export default memo(DashboardRoutes);

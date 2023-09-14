import { lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from './routes-with-not-found';
import { DASHBOARD_ROUTES, STORE_ROUTES } from '@/config/routes.config';
import StoreRoutes from './store-routes';
import FullScreenLoader from '@/features/ui/full-screen-loader';
import AuthGuard from '../guards/auth-guard';

export default function AppRouter() {
  const DashboardRoutes = lazy(() => import('@/routing/components/dashboard-routes'));

  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={STORE_ROUTES.INDEX} />} />
        <Route path={`${STORE_ROUTES.INDEX}/*`} element={<StoreRoutes />} />
        <Route element={<AuthGuard />}>
          <Route
            path={`${DASHBOARD_ROUTES.INDEX}/*`}
            element={
              <Suspense fallback={<FullScreenLoader message="Loading dashboard ..." />}>
                <DashboardRoutes />
              </Suspense>
            }
          />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
}

import { useEffect } from 'react';
import FullScreenLoader from '@/features/ui/full-screen-loader';
import { Navigate, Outlet } from 'react-router-dom';
import { STORE_ROUTES } from '@/config/routes.config';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { AuthActions } from '@/features/auth/redux/auth.slice';
import { AuthThunk } from '@/features/auth/redux/auth.thunk';

type AuthGuardProps = {};

export default function AuthGuard({}: AuthGuardProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, verifyToken } = useAppSelector(store => store.auth);
  const { me } = useAppSelector(store => store.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(AuthThunk.verifyAccessToken());
    } else {
      dispatch(AuthActions.stopTokenVerificationProcess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (verifyToken.status === 'loading' || me.status === 'loading')
    return <FullScreenLoader message="Loading dashboard ..." />;

  return isAuthenticated ? <Outlet /> : <Navigate replace to={STORE_ROUTES.LOGIN} />;
}

import { STORE_ROUTES } from '@/config/routes.config';
import { myRole } from '@/constants/auth.constant';
import { ROLES } from '@/constants/roles.constant';
import { Navigate, Outlet } from 'react-router-dom';

type RoleGuardProps = {
  allowedRoles: ROLES[];
};

export default function RoleGuard({ allowedRoles = [] }: RoleGuardProps) {
  if (allowedRoles.length === 0) return <Outlet />;

  const isRoleValid = allowedRoles.includes(myRole);

  return isRoleValid ? <Outlet /> : <Navigate replace to={STORE_ROUTES.UNAUTHORIZED} />;
}

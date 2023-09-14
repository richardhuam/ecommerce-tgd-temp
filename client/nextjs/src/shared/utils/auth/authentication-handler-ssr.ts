import { routes } from '@/config/routes';
import { ROLES } from '@/shared/constants';
import { EmptyLoggedInState, ILoggedIn } from '@/shared/models/auth.model';
import { IContext } from '@/shared/models/default.model,';

type AuthenticationSsrProps = {
  context: IContext;
  isAuthenticated: boolean;
  allowedAccessRoles?: ROLES[];
  requireAuthentication?: boolean;
  redirectionFailPath?: string;
};

export const authenticationSsr = ({
  context,
  isAuthenticated,
  allowedAccessRoles = [],
  requireAuthentication = allowedAccessRoles.length > 0,
  redirectionFailPath = '/',
}: AuthenticationSsrProps) => {
  const loggedIn: ILoggedIn = context.req?.cookies?.logged_in ? JSON.parse(context.req?.cookies?.logged_in) : EmptyLoggedInState;
  const hasValidRole = allowedAccessRoles.includes(loggedIn.role);

  if (requireAuthentication && !isAuthenticated) {
    //console.log('required authentication___NOT AUTHENTICATED');
    return {
      redirect: {
        destination: redirectionFailPath,
        permanent: false,
      },
    };
  }

  if (!hasValidRole && allowedAccessRoles.length > 0) {
    //console.log(`your role ${loggedIn.role} does NOT suffy these roles ${allowedAccessRoles.map(role => role).join(' ')}`);
    return {
      redirect: {
        destination: routes.unauthorized,
        permanent: false,
      },
    };
  }
};

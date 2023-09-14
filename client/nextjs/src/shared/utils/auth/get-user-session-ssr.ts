import { EmptyLoggedInState, EmptySessionState, ILoggedIn, ISession } from '@/shared/models/auth.model';
import { UserService } from '@/shared/services/user/user.service';

export const getUserSessionSsr = async (ctx: any): Promise<ISession> => {
  const hasCookies = ctx.req.headers.cookie;
  const loggedIn: ILoggedIn = ctx.req?.cookies?.logged_in ? JSON.parse(ctx.req?.cookies?.logged_in) : EmptyLoggedInState;

  const config = {
    withCredentials: true,
    headers: {
      Cookie: hasCookies,
    },
  };

  if (!hasCookies) return EmptySessionState;

  try {
    const result = await UserService.getMe(config);
    if (result.ok) {
      return {
        isAuthenticated: true,
        userData: result.data,
        loggedIn,
      };
    } else {
      return EmptySessionState;
    }
  } catch (err: any) {
    return EmptySessionState;
  }
};

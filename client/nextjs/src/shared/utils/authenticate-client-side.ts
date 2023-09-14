import { NextRouter } from 'next/router';

import { routes } from '@/config/routes';

import { IUser } from '../models/account.model';
import { UserService } from '../services/user/user.service';

interface AuthenticateClientSideProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setMe: React.Dispatch<React.SetStateAction<IUser>>;
  router: NextRouter;
}

export async function authenticateClientSide({ setIsAuthenticated, setMe, router }: AuthenticateClientSideProps) {
  try {
    const user = await UserService.getMe();
    if (user.ok) {
      setIsAuthenticated(true);
      setMe(user.data);
    }
  } catch (error) {
    //console.log(error);
    router.push(routes.home);
  }
}

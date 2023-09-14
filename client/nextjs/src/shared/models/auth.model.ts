import { ROLES, USER_STATUS } from '@/shared/constants';

import { EmptyUserState, IUser } from './account.model';

export type ILoggedIn = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: USER_STATUS | '';
  role: ROLES;
};

export const EmptyLoggedInState: ILoggedIn = {
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  role: ROLES.USER,
  status: '',
};

export const EmptySessionState = {
  isAuthenticated: false,
  userData: EmptyUserState,
  loggedIn: EmptyLoggedInState,
};

export type ISession = { isAuthenticated: boolean; userData: IUser; loggedIn: ILoggedIn };

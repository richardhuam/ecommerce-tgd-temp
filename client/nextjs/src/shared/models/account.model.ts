import { LOGIN_METHOD, ROLES, USER_STATUS } from '@/shared/constants';

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  address?: IUserAddress;
  loginMethod: LOGIN_METHOD | '';
  emailVerified: boolean;
  role: ROLES | '';
  status: USER_STATUS | '';
  dateOfBirth: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const EmptyUserState: IUser = {
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  avatar: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: {
      code: '',
      name: '',
    },
  },
  loginMethod: '',
  emailVerified: false,
  role: '',
  status: '',
  dateOfBirth: '',
  createdAt: '',
  updatedAt: '',
};

export interface IUserAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: {
    code?: string;
    name?: string;
  };
}

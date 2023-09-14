import { USER_STATUS } from '@/constants/account.constant';
import { ROLES } from '@/constants/roles.constant';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: ROLES;
  status: USER_STATUS;
  createdAt: string;
  updatedAt: string;
}

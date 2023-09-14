import { IGenericState } from '@/interfaces/redux.interface';
import { IUser } from '../interfaces/user.interface';

export interface IUserSliceState {
  me: IGenericState<IUser | null>;
}

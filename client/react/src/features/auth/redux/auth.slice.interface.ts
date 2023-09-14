import { IGenericStateWithoutData } from '@/interfaces/redux.interface';

export interface IAuthSliceState {
  isAuthenticated: boolean;
  login: IGenericStateWithoutData;
  verifyToken: IGenericStateWithoutData;
}

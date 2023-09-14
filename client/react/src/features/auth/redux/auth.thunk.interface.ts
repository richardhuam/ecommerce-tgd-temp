import { NavigateFunction } from 'react-router-dom';
import { ILoginApiParams } from '../api/auth.service.types';

export interface ILoginThunk {
  navigate: NavigateFunction;
  apiValues: ILoginApiParams;
}

import { localStorageKeys } from '@/config/localStorageKeys.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginThunk } from './auth.thunk.interface';
import { AuthActions } from './auth.slice';
import { AuthService } from '../api/auth.service';

const createAuthActionKey = (actionName: string) => `auth/${actionName}`;
export class AuthThunk {
  static login = createAsyncThunk(createAuthActionKey('login'), async (props: ILoginThunk, thunkApi) => {
    try {
      const result = await AuthService.login(props.apiValues);
      if (result.ok) {
        window.localStorage.setItem(localStorageKeys.accessToken, result.data.token);
        thunkApi.dispatch(AuthActions.authenticateUser());
        props.navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  });

  static verifyAccessToken = createAsyncThunk(createAuthActionKey('verifyAccessToken'), async (_, thunkApi) => {
    try {
      const result = await AuthService.verifyToken();
      if (!result.ok) {
        thunkApi.dispatch(AuthActions.logoutUser());
      }
    } catch (error) {
      thunkApi.dispatch(AuthActions.logoutUser());
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  });
}

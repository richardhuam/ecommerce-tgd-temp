import { localStorageKeys } from '@/config/localStorageKeys.config';
import { createSlice } from '@reduxjs/toolkit';
import { AuthThunk } from './auth.thunk';
import { IAuthSliceState } from './auth.slice.interface';

const initialState: IAuthSliceState = {
  isAuthenticated: !!window.localStorage.getItem(localStorageKeys.accessToken),
  login: {
    error: null,
    status: 'idle',
  },
  verifyToken: {
    error: null,
    status: 'idle',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: state => {
      state.isAuthenticated = true;
    },
    logoutUser: state => {
      window.localStorage.removeItem(localStorageKeys.accessToken);
      state.isAuthenticated = false;
    },
    stopTokenVerificationProcess: state => {
      state.isAuthenticated = false;
      state.verifyToken.status = 'idle';
    },
    resetState: state => {
      state.isAuthenticated = false;
      state.login.status = 'idle';
      state.login.error = null;
      state.verifyToken.status = 'idle';
      state.verifyToken.error = null;
    },
  },
  extraReducers(builder) {
    // login
    builder.addCase(AuthThunk.login.pending, state => {
      state.login.error = null;
      state.login.status = 'loading';
    });
    builder.addCase(AuthThunk.login.fulfilled, state => {
      state.login.status = 'finished';
      state.login.error = null;
    });
    builder.addCase(AuthThunk.login.rejected, (state, action) => {
      state.login.status = 'finished';
      if (typeof action.payload === 'string') {
        state.login.error = action.payload;
      }
    });
    // verify access token
    builder.addCase(AuthThunk.verifyAccessToken.pending, state => {
      state.verifyToken.error = null;
      state.verifyToken.status = 'loading';
    });
    builder.addCase(AuthThunk.verifyAccessToken.fulfilled, state => {
      state.verifyToken.status = 'finished';
      state.verifyToken.error = null;
    });
    builder.addCase(AuthThunk.verifyAccessToken.rejected, (state, action) => {
      state.verifyToken.status = 'finished';
      if (typeof action.payload === 'string') {
        state.verifyToken.error = action.payload;
      }
    });
  },
});

export const AuthActions = authSlice.actions;

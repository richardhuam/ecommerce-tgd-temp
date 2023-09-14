import { createSlice } from '@reduxjs/toolkit';
import { UserThunk } from './user.thunk';
import { IUserSliceState } from './user.slice.interface';

const initialState: IUserSliceState = {
  me: {
    data: null,
    status: 'idle',
    error: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get Me
    builder.addCase(UserThunk.getMe.pending, state => {
      state.me.error = null;
      state.me.status = 'loading';
    });
    builder.addCase(UserThunk.getMe.fulfilled, (state, action) => {
      state.me.status = 'finished';
      state.me.error = null;
      if (typeof action.payload !== 'string' && typeof action.payload !== 'undefined') {
        state.me.data = action.payload;
      }
    });
    builder.addCase(UserThunk.getMe.rejected, (state, action) => {
      state.me.status = 'finished';
      if (typeof action.payload === 'string') {
        state.me.error = action.payload;
      }
    });
  },
});

export const UserActions = userSlice.actions;

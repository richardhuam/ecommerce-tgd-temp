import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../api/user.service';

const createUserActionKey = (actionName: string) => `user/${actionName}`;

export class UserThunk {
  static getMe = createAsyncThunk(createUserActionKey('me'), async (_, thunkApi) => {
    try {
      const result = await UserService.getMe();
      if (result.ok) {
        return result.data;
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  });
}

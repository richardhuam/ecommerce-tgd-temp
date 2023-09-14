import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryService } from '../api/category.service';

const createCategoryActionKey = (actionName: string) => `category/${actionName}`;

export class CategoryThunk {
  static getAllCategories = createAsyncThunk(createCategoryActionKey('getAllCategories'), async (_, thunkApi) => {
    try {
      const result = await CategoryService.getAllCategories();
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

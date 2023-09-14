import { createSlice } from '@reduxjs/toolkit';
import { ICategorySliceState } from './category.slice.interface';
import { CategoryThunk } from './category.thunk';

const initialState: ICategorySliceState = {
  getAllCategories: {
    data: [],
    error: null,
    status: 'idle',
  },
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(CategoryThunk.getAllCategories.pending, state => {
      state.getAllCategories.error = null;
      state.getAllCategories.status = 'loading';
    });
    builder.addCase(CategoryThunk.getAllCategories.fulfilled, (state, action) => {
      state.getAllCategories.error = null;
      state.getAllCategories.status = 'finished';
      if (action.payload) {
        state.getAllCategories.data = action.payload;
      }
    });
    builder.addCase(CategoryThunk.getAllCategories.rejected, (state, action) => {
      state.getAllCategories.status = 'finished';
      if (typeof action.payload === 'string') {
        state.getAllCategories.error = action.payload;
      }
    });
  },
});

export const CategoryActions = categorySlice.actions;

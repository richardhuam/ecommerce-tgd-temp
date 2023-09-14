import { createSlice } from '@reduxjs/toolkit';
import { IProductSliceState } from './product.slice.interface';
import { ProductThunk } from './product.thunk';

const initialState: IProductSliceState = {
  isProductSearchDrawerOpen: false,
  getLimitedTrendingProducts: {
    data: [],
    error: null,
    status: 'idle',
  },
  getLimitedBestSellers: {
    data: [],
    error: null,
    status: 'idle',
  },
  getLimitedNewArrivals: {
    data: [],
    error: null,
    status: 'idle',
  },
  getTrendingProducts: {
    data: null,
    error: null,
    status: 'idle',
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    openProductSearchDrawer: state => {
      state.isProductSearchDrawerOpen = true;
    },
    closeProductSearchDrawer: state => {
      state.isProductSearchDrawerOpen = false;
    },
    toggleProductSearchDrawer: state => {
      state.isProductSearchDrawerOpen = !state.isProductSearchDrawerOpen;
    },
  },
  extraReducers(builder) {
    // Get limited best sellers
    builder.addCase(ProductThunk.getLimitedBestSellers.pending, state => {
      state.getLimitedBestSellers.error = null;
      state.getLimitedBestSellers.status = 'loading';
    });
    builder.addCase(ProductThunk.getLimitedBestSellers.fulfilled, (state, action) => {
      state.getLimitedBestSellers.error = null;
      state.getLimitedBestSellers.status = 'finished';
      if (typeof action.payload !== 'undefined') {
        state.getLimitedBestSellers.data = action.payload;
      }
    });
    builder.addCase(ProductThunk.getLimitedBestSellers.rejected, (state, action) => {
      state.getLimitedBestSellers.status = 'finished';
      if (typeof action.payload === 'string') {
        state.getLimitedBestSellers.error = action.payload;
      }
    });

    // Get limited new arrivals
    builder.addCase(ProductThunk.getLimitedNewArrivals.pending, state => {
      state.getLimitedNewArrivals.error = null;
      state.getLimitedNewArrivals.status = 'loading';
    });
    builder.addCase(ProductThunk.getLimitedNewArrivals.fulfilled, (state, action) => {
      state.getLimitedNewArrivals.error = null;
      state.getLimitedNewArrivals.status = 'finished';
      if (typeof action.payload !== 'undefined') {
        state.getLimitedNewArrivals.data = action.payload;
      }
    });
    builder.addCase(ProductThunk.getLimitedNewArrivals.rejected, (state, action) => {
      state.getLimitedNewArrivals.status = 'finished';
      if (typeof action.payload === 'string') {
        state.getLimitedNewArrivals.error = action.payload;
      }
    });

    // Get limited trending products
    builder.addCase(ProductThunk.getLimitedTrendingProducts.pending, state => {
      state.getLimitedTrendingProducts.error = null;
      state.getLimitedTrendingProducts.status = 'loading';
    });
    builder.addCase(ProductThunk.getLimitedTrendingProducts.fulfilled, (state, action) => {
      state.getLimitedTrendingProducts.error = null;
      state.getLimitedTrendingProducts.status = 'finished';
      if (typeof action.payload !== 'undefined') {
        state.getLimitedTrendingProducts.data = action.payload;
      }
    });
    builder.addCase(ProductThunk.getLimitedTrendingProducts.rejected, (state, action) => {
      state.getLimitedTrendingProducts.status = 'finished';
      if (typeof action.payload === 'string') {
        state.getLimitedTrendingProducts.error = action.payload;
      }
    });

    // Get trending products
    builder.addCase(ProductThunk.getTrendingProducts.pending, state => {
      state.getTrendingProducts.error = null;
      state.getTrendingProducts.status = 'loading';
    });
    builder.addCase(ProductThunk.getTrendingProducts.fulfilled, (state, action) => {
      state.getTrendingProducts.error = null;
      state.getTrendingProducts.status = 'finished';
      if (action.payload) {
        state.getTrendingProducts.data = action.payload;
      }
    });
    builder.addCase(ProductThunk.getTrendingProducts.rejected, (state, action) => {
      state.getTrendingProducts.status = 'finished';
      if (typeof action.payload === 'string') {
        state.getTrendingProducts.error = action.payload;
      }
    });
  },
});

export const ProductActions = productSlice.actions;

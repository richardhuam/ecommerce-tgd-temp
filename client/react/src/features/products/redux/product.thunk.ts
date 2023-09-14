import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductService } from '../api/product.service';
import { IGetTrendingProductsThunk } from './product.thunk.interface';

const createProductActionKey = (actionName: string) => `product/${actionName}`;

export class ProductThunk {
  static getLimitedBestSellers = createAsyncThunk(
    createProductActionKey('getLimitedBestSellers'),
    async (_, thunkApi) => {
      try {
        const result = await ProductService.getLimitedBestSellers();
        if (result.ok) {
          return result.data;
        }
      } catch (error) {
        if (error instanceof Error) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    },
  );

  static getLimitedNewArrivals = createAsyncThunk(
    createProductActionKey('getLimitedNewArrivals'),
    async (_, thunkApi) => {
      try {
        const result = await ProductService.getLimitedNewArrivals();
        if (result.ok) {
          return result.data;
        }
      } catch (error) {
        if (error instanceof Error) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    },
  );

  static getLimitedTrendingProducts = createAsyncThunk(
    createProductActionKey('getLimitedTrendingProducts'),
    async (_, thunkApi) => {
      try {
        const result = await ProductService.getLimitedTrendingProducts();
        if (result.ok) {
          return result.data;
        }
      } catch (error) {
        if (error instanceof Error) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    },
  );

  static getTrendingProducts = createAsyncThunk(
    createProductActionKey('getTrendingProducts'),
    async (props: IGetTrendingProductsThunk, thunkApi) => {
      try {
        const result = await ProductService.getTrendingProducts(props);
        if (result.ok) {
          return result.data;
        }
      } catch (error) {
        if (error instanceof Error) {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    },
  );
}

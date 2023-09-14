import { IGenericState } from '@/interfaces/redux.interface';
import { IGetTrendingProductsApiResponse } from '../api/product.service.types';
import { IProduct } from '../product.interface';

export type IProductSliceState = {
  isProductSearchDrawerOpen: boolean;
  getLimitedBestSellers: IGenericState<IProduct[]>;
  getLimitedNewArrivals: IGenericState<IProduct[]>;
  getLimitedTrendingProducts: IGenericState<IProduct[]>;

  getTrendingProducts: IGenericState<IGetTrendingProductsApiResponse['data'] | null>;
};

import { IApiResponse, IPagination, IQueryParams } from '@/interfaces/api.interface';
import { IProduct } from '../product.interface';

// Params
export type IGetBestSellersApiParams = Pick<IQueryParams, 'page'> & Partial<Pick<IQueryParams, 'limit'>>;
export type IGetNewArrivalsApiParams = Pick<IQueryParams, 'page'> & Partial<Pick<IQueryParams, 'limit'>>;
export type IGetTrendingProductsApiParams = Pick<IQueryParams, 'page'> & Partial<Pick<IQueryParams, 'limit'>>;
export type ISearchProductsApiParams = Pick<IQueryParams, 'keyWord' | 'page'> & Partial<Pick<IQueryParams, 'limit'>>;

// Responses
export type IGetLimitedBestSellersApiResponse = IApiResponse<IProduct[]>;
export type IGetLimitedNewArrivalsApiResponse = IApiResponse<IProduct[]>;
export type IGetLimitedTrendingProductsApiResponse = IApiResponse<IProduct[]>;

export type IGetBestSellersApiResponse = IApiResponse<{
  result: IProduct[];
  pagination: IPagination;
}>;

export type IGetNewArrivalsApiResponse = IApiResponse<{
  result: IProduct[];
  pagination: IPagination;
}>;

export type IGetTrendingProductsApiResponse = IApiResponse<{
  result: IProduct[];
  pagination: IPagination;
}>;

export type IViewProductApiResponse = IApiResponse<{
  productId: string;
  productName: string;
  views: number;
  score: number;
}>;

export type ISearchProductsApiResponse = IApiResponse<{
  result: IProduct[];
  pagination: IPagination;
}>;

export type IGetProductBySkuApiResponse = IApiResponse<IProduct>;
export type IGetRecommendedProductsApiResponse = IApiResponse<IProduct[]>;
export type IGetProductByIdApiResponse = IApiResponse<IProduct>;

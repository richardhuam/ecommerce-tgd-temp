import { AxiosRequestConfig } from 'axios';

import { IApiResponse, IPagination, IQueryParams } from '@/shared/models/api.model';
import { IProduct } from '@/shared/models/product.model';

// Params
export type IGetWishlistApiParams = Pick<IQueryParams, 'page'> &
  Partial<Pick<IQueryParams, 'limit'>> & {
    axiosConfig?: AxiosRequestConfig;
  };

// Responses
export type IGetWishlistApiResponse = IApiResponse<{
  result: IProduct[];
  collection: string[];
  pagination: Omit<IPagination, 'query'>;
}>;

export type IToggleWishlistApiResponse = IApiResponse<{
  status: 'added' | 'removed';
  productId: string;
}>;

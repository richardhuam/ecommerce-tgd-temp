import { AxiosRequestConfig } from 'axios';

import { IApiResponse, IPagination, IQueryParams } from '@/shared/models/api.model';
import { IProduct } from '@/shared/models/product.model';
import { IReview } from '@/shared/models/review.model';

interface IPendingAndCompletedReviews {
  product: IProduct;
  orderDate: Date;
  orderTrackingNumber: string;
  productSku: string;
  quantity: number;
  reviewed: boolean;
  orderId: string;
  _id: string;
}

// Params
export type IGetReviewsApiParams = Pick<IQueryParams, 'page'> &
  Partial<Pick<IQueryParams, 'limit'>> & {
    productSku: string;
  };

export type ICreateReviewApiParams = {
  productSku: string;
  orderId: string;
  rating: number;
  comment: string | null;
};

export type IGetPendingReviewsApiParams = {
  page: number;
  limit?: number;
  axiosConfig?: AxiosRequestConfig;
};

export type IGetCompletedReviewsApiParams = {
  page: number;
  limit?: number;
  axiosConfig?: AxiosRequestConfig;
};

// Responses
export type IGetReviewsApiResponse = IApiResponse<{
  result: IReview[];
  pagination: Omit<IPagination, 'query'>;
}>;

export type IGetPendingReviewsApiResponse = IApiResponse<{
  pagination: Omit<IPagination, 'query'>;
  result: IPendingAndCompletedReviews[][];
}>;

export type IGetCompletedReviewsApiResponse = IApiResponse<{
  pagination: Omit<IPagination, 'query'>;
  result: IPendingAndCompletedReviews[][];
}>;

export type ICreateReviewApiResponse = IApiResponse<IReview[]>;
export type IPendingReviewsAsCollectionApiResponse = IApiResponse<string[]>;

import { apiClient } from '../api/api.service';
import {
  ICreateReviewApiParams,
  ICreateReviewApiResponse,
  IGetCompletedReviewsApiParams,
  IGetCompletedReviewsApiResponse,
  IGetPendingReviewsApiParams,
  IGetPendingReviewsApiResponse,
  IGetReviewsApiParams,
  IGetReviewsApiResponse,
  IPendingReviewsAsCollectionApiResponse,
} from './review.service.types';
import { DEFAULT_GET_PENDING_OR_COMPLETED_REVIEWS_LIMIT, DEFAULT_GET_REVIEWS_LIMIT } from './review.service.utils';

const suffixUrl = '/reviews';
export const reviewsApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class ReviewService {
  public static async getReviews({
    productSku,
    page,
    limit = DEFAULT_GET_REVIEWS_LIMIT,
  }: IGetReviewsApiParams): Promise<IGetReviewsApiResponse> {
    const response = await apiClient.get(reviewsApiUrl(`?productSku=${productSku}&page=${page}&limit=${limit}`));
    return response.data;
  }

  public static async createReview(createReviewApiParams: ICreateReviewApiParams): Promise<ICreateReviewApiResponse> {
    const response = await apiClient.post(reviewsApiUrl(), createReviewApiParams);
    return response.data;
  }

  public static async getPendingReviews({
    page,
    limit = DEFAULT_GET_PENDING_OR_COMPLETED_REVIEWS_LIMIT,
    axiosConfig,
  }: IGetPendingReviewsApiParams): Promise<IGetPendingReviewsApiResponse> {
    const response = await apiClient.get(reviewsApiUrl(`/pending?page=${page}&limit=${limit}`), axiosConfig);
    return response.data;
  }

  public static async getPendingReviewsAsCollection(): Promise<IPendingReviewsAsCollectionApiResponse> {
    const response = await apiClient.get(reviewsApiUrl('/pending-as-collection'));
    return response.data;
  }

  public static async getCompletedReviews({
    page,
    limit = DEFAULT_GET_PENDING_OR_COMPLETED_REVIEWS_LIMIT,
    axiosConfig,
  }: IGetCompletedReviewsApiParams): Promise<IGetCompletedReviewsApiResponse> {
    const response = await apiClient.get(reviewsApiUrl(`/completed?page=${page}&limit=${limit}`), axiosConfig);
    return response.data;
  }
}

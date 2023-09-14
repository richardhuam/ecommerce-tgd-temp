import { useMutation, useQuery } from '@tanstack/react-query';

import { ReviewService } from '@/shared/services/reviews/review.service';
import {
  ICreateReviewApiParams,
  IGetCompletedReviewsApiParams,
  IGetPendingReviewsApiParams,
  IGetReviewsApiParams,
} from '@/shared/services/reviews/review.service.types';

export const reviewKeys = {
  all: ['review'] as const,
  reviews: ({ productSku, page }: IGetReviewsApiParams) => [...reviewKeys.all, { productSku, page }] as const,
  pendingReviews: ({ page }: IGetPendingReviewsApiParams) => [...reviewKeys.all, 'pending', { page }] as const,
  pendingReviewsAsCollection: () => [...reviewKeys.all, 'pending-as-collection'] as const,
  completedReviews: ({ page }: IGetCompletedReviewsApiParams) => [...reviewKeys.all, 'completed', { page }] as const,
};

export const useGetReviews = ({ productSku, page }: IGetReviewsApiParams) => {
  return useQuery(reviewKeys.reviews({ productSku, page }), () => ReviewService.getReviews({ productSku, page }));
};

export const useGetPendingReviews = ({ page }: IGetPendingReviewsApiParams) => {
  return useQuery(reviewKeys.pendingReviews({ page }), () => ReviewService.getPendingReviews({ page }), {
    keepPreviousData: true,
  });
};
export const useGetPendingReviewsAsCollection = (isAuthenticated: boolean) => {
  return useQuery(reviewKeys.pendingReviewsAsCollection(), () => ReviewService.getPendingReviewsAsCollection(), {
    enabled: isAuthenticated,
  });
};

export const useGetCompletedReviews = ({ page }: IGetCompletedReviewsApiParams) => {
  return useQuery(reviewKeys.completedReviews({ page }), () => ReviewService.getCompletedReviews({ page }), {
    keepPreviousData: true,
  });
};

export const useCreateReview = () => {
  return useMutation((createReviewApiParams: ICreateReviewApiParams) => ReviewService.createReview(createReviewApiParams));
};

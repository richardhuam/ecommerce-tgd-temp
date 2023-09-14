import { yupResolver } from '@hookform/resolvers/yup';
import { UseQueryResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/shared/components/ui/button';
import Rating from '@/shared/components/ui/rating';
import TextArea from '@/shared/components/ui/text-area';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { productKeys, useGetProductBySku } from '@/shared/queries/product/product.query';
import { reviewKeys, useCreateReview } from '@/shared/queries/reviews/review.query';
import {
  ICreateReviewApiParams,
  IGetReviewsApiResponse,
  IPendingReviewsAsCollectionApiResponse,
} from '@/shared/services/reviews/review.service.types';

type ProductReviewFormProps = {
  reviews: UseQueryResult<IGetReviewsApiResponse, unknown>;
  pendingReviewsAsCollection: UseQueryResult<IPendingReviewsAsCollectionApiResponse, unknown>;
  productSku: string;
  orderId: string;
  setOrderId: React.Dispatch<React.SetStateAction<string | null>>;
};

const reviewFormValidation = yup.object().shape({
  comment: yup.string().max(800, 'The maximum length is 800 characters.').optional(),
});

export default function ProductReviewForm({
  productSku,
  reviews,
  pendingReviewsAsCollection,
  orderId,
  setOrderId,
}: ProductReviewFormProps) {
  const reviewMutation = useCreateReview();
  const [selectedRating, setSelectedRating] = useState(0);
  const productBySku = useGetProductBySku(productSku);

  const handleRatingChange = (newValue: number) => {
    setSelectedRating(newValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<ICreateReviewApiParams>({
    defaultValues: {
      comment: undefined,
      rating: 0,
      productSku: productSku,
    },
    resolver: yupResolver(reviewFormValidation),
  });

  function onSubmit(values: ICreateReviewApiParams) {
    const queryClient = getQueryClient();
    const formData: ICreateReviewApiParams = {
      comment: values?.comment?.length === 0 ? (defaultValues?.comment as string) : values?.comment,
      rating: selectedRating,
      productSku: values.productSku,
      orderId,
    };

    reviewMutation.mutate(formData, {
      onSuccess: () => {
        setOrderId(null);
        reviews.refetch();
        pendingReviewsAsCollection.refetch();
        productBySku.refetch();
        setSelectedRating(0);
        queryClient.invalidateQueries(reviewKeys.all);
        queryClient.invalidateQueries(productKeys.productBySku(productSku));
        //queryClient.invalidateQueries(reviewKeys.pendingAndCompletedReviews());
      },
      onError: error => {
        console.log(error);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 rounded-md">
      <h3 className=" mb-1">Add a review</h3>
      <div>
        <span className="text-14 text-gray-600">Your Rating</span>
        <Rating selectedValue={selectedRating} onChange={handleRatingChange} starSize="md" />
      </div>
      <div className="mb-2">
        <TextArea
          required={false}
          label="Your Review (optional)"
          placeholder="I liked this product.."
          {...register('comment')}
          error={errors.comment?.message}
        />
      </div>
      <Button loading={reviewMutation.isLoading} disabled={selectedRating === 0} type="submit">
        Submit
      </Button>
    </form>
  );
}

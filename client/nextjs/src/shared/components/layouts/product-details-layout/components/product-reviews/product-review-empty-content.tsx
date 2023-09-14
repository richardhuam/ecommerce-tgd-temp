import { UseQueryResult } from '@tanstack/react-query';

import { IGetReviewsApiResponse } from '@/shared/services/reviews/review.service.types';

type ProductReviewEmptyContentProps = {
  reviews: UseQueryResult<IGetReviewsApiResponse, unknown>;
};

export default function ProductReviewEmptyContent({ reviews }: ProductReviewEmptyContentProps) {
  return (
    <div className="divide-y-1">
      <h3 className="text-15 font-medium text-gray-700">All Reviews ({reviews.data?.data.result.length})</h3>
      <div className="p-6 text-center text-15 text-gray-600">Currently, there are no reviews available for this product.</div>
    </div>
  );
}

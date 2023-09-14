import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import Alert from '@/shared/components/ui/alert';
import { SpinnerWithText } from '@/shared/components/ui/spinners/spinner';
import { useAuth } from '@/shared/contexts/auth.context';
import { IProduct } from '@/shared/models/product.model';
import { useGetPendingReviewsAsCollection, useGetReviews } from '@/shared/queries/reviews/review.query';
import { getSlugFirstParam } from '@/shared/utils/get-product-sku-from-slug';

import ProductReviewContent from './product-review-content';
import ProductReviewEmptyContent from './product-review-empty-content';
import ProductReviewForm from './product-review-form';
import ProductRating from './product-review-rating';

type ProductReviewsProps = {
  product: IProduct;
};

export default function ProductReviews({ product }: ProductReviewsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const pendingReviewsAsCollection = useGetPendingReviewsAsCollection(isAuthenticated);
  const [orderId, setOrderId] = useState<string | null>((router.query?.orderId as string) ?? null);

  const productSku = getSlugFirstParam(router.query?.productSlug);

  const isSuitableForReview = !!pendingReviewsAsCollection?.data?.data?.filter(item => item === productSku).length;

  const [reviewPage, setReviewPage] = useState<number>(1);
  const reviews = useGetReviews({ page: reviewPage, productSku });

  function handleReviewPageChange(page: number) {
    setReviewPage(page);
  }

  const scrollToElement = () => {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (router.query?.review === 'true' && reviews?.data?.ok) {
      scrollToElement();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reviews.isLoading) {
    return <SpinnerWithText title="Loading reviews" />;
  }

  if (!reviews?.data?.ok) {
    return <Alert title="Oops, something wrong happened" message="We could not load the reviews" />;
  }

  return (
    <div ref={reviewRef} className="flex md:flex-row flex-col space-x-0 md:space-x-6 lg:space-x-10">
      {/* Rating */}
      <ProductRating product={product} />
      {/* Reviews */}
      <div className="w-full space-y-4">
        {/* comments */}
        {reviews.data.data.result.length === 0 ? (
          <ProductReviewEmptyContent reviews={reviews} />
        ) : (
          <ProductReviewContent reviews={reviews} handleReviewPageChange={handleReviewPageChange} />
        )}
        {/* Leave a comment */}
        {isSuitableForReview && orderId && (
          <ProductReviewForm
            productSku={productSku}
            reviews={reviews}
            pendingReviewsAsCollection={pendingReviewsAsCollection}
            orderId={orderId}
            setOrderId={setOrderId}
          />
        )}
      </div>
    </div>
  );
}

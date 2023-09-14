import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { routes } from '@/config/routes';
import Alert from '@/shared/components/ui/alert';
import Button from '@/shared/components/ui/button';
import Paginate from '@/shared/components/ui/paginate';
import Paper from '@/shared/components/ui/paper';
import { SpinnerWithText } from '@/shared/components/ui/spinners/spinner';
import StarRating from '@/shared/components/ui/star-rating';
import { useGetPendingReviews } from '@/shared/queries/reviews/review.query';
import { envService } from '@/shared/services/env/env.service';
import { calculateRatingAverage } from '@/shared/utils/calculate-rating-average';
import { formatDate } from '@/shared/utils/formate-date';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

type PendingReviewsTabProps = {};

export default function PendingReviewsTab({}: PendingReviewsTabProps) {
  const [pendingPage, setPendingPage] = useState<number>(1);
  const { data: pendingReviews, isLoading } = useGetPendingReviews({ page: pendingPage });

  function handlePageChange(page: number) {
    setPendingPage(page);
  }

  if (isLoading) {
    return <SpinnerWithText spinnerSize="md" text="Loading content" />;
  }

  if (!pendingReviews?.ok) {
    return <Alert variant="error" title="Oops, something went wrong" message="Failed to load completed reviews, please try again later" />;
  }

  if (pendingReviews.data.result.length === 0) {
    return <Alert variant="info" title="No pending reviews" message="You have no pending reviews" />;
  }

  return (
    <div className="space-y-6">
      {pendingReviews?.data?.result?.map((groupedReviews, index) => {
        let lastOrderDate: Date | null = null;
        return (
          <Paper key={index} padding="custom" className="divide-y-1 p-4 lg:p-6">
            {groupedReviews.map(item => {
              const shouldRenderOrderDate = item.orderDate !== lastOrderDate;
              lastOrderDate = item.orderDate;

              //calculating the star rating average
              const ratingNumericValues = item?.product.reviews.map(item => item.rating) || [];
              const ratingAverage = Math.round(Number(calculateRatingAverage(ratingNumericValues, 1)));

              return (
                <div key={item._id} className="">
                  {shouldRenderOrderDate ? ( // Render order date conditionally
                    <h2 className="pt-2">
                      Order date: {formatDate(item.orderDate, 'DD MMM, YYYY')} | #{item.orderTrackingNumber.toUpperCase()}
                    </h2>
                  ) : null}
                  <div className="flex w-full py-4">
                    <div>
                      <div className="w-[100px] md:w-[140px] lg:w-[160px] xl:w-[180px]">
                        <Link
                          href={routes.productUrl(item.product)}
                          className="relative w-auto h-32 lg:h-36 flex items-center justify-center"
                        >
                          <Image
                            src={getProductImageUrl({
                              pathUrl: `${envService().productImageUrl}`,
                              productImage: item.product.images.main,
                            })}
                            fill
                            alt={`product-${item.product.name}`}
                            className="object-contain"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="flex-grow pl-4">
                      <Link href={routes.productUrl(item.product)}>
                        <h2 className="text-15 lg:text-16 font-light mb-1">
                          {item.product.brand} {item.product.name} | <span className="tracking-widest">Qty: x{item.quantity}</span>
                        </h2>
                      </Link>
                      <Link href={routes.productUrl(item.product)}>
                        <p className="text-13 lg:text-14 font-light line-clamp-2">{item.product.description}</p>
                      </Link>
                      <div className="mt-2 flex">
                        <div className="w-1/2">
                          <div className="inline-block max-w-full space-y-1">
                            <Link
                              href={{
                                pathname: routes.productUrl(item.product),
                                query: {
                                  orderId: item.orderId,
                                  review: 'true',
                                },
                              }}
                              className="cursor-pointer text-semibold text-13 text-primary hover:underline"
                            >
                              <Button> Add Review</Button>
                            </Link>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="mt-1 items-end lg:items-center justify-end lg:justify-start flex lg:flex-row flex-col lg:gap-2">
                            <StarRating ratingValue={ratingAverage} />
                            <p className="mt-1 text-12 lg:text-13 sm:mt-0 text-[#333333]">
                              {item.product.reviews.length >= 1 ? `${item.product.reviews.length} reviews` : 'No reviews'}&nbsp;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Paper>
        );
      })}
      {pendingReviews?.data?.pagination && (
        <div className="mt-4 lg:mt-6">
          <Paginate onPageChange={handlePageChange} pagination={pendingReviews?.data?.pagination} />
        </div>
      )}
    </div>
  );
}

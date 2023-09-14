import { RiStarFill } from 'react-icons/ri';

import StarRating from '@/shared/components/ui/star-rating';
import { IProduct } from '@/shared/models/product.model';
import { calculateRatingAverage } from '@/shared/utils/calculate-rating-average';

type ProductRatingProps = {
  product: IProduct;
};

export default function ProductRating({ product }: ProductRatingProps) {
  const ratingNumericValues = product?.reviews?.map(item => item.rating) || [];

  const counts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  ratingNumericValues.forEach(rating => {
    counts[rating]++;
  });

  return (
    <div className="w-[350px] max-w-[214px] md:max-w-none mb-8 md:mb-0">
      <h2 className="text-18 font-medium mb-1">Reviews of this product</h2>
      <div className="flex items-center justify-start gap-2">
        <span className="text-[40px] font-semibold text-primary">{calculateRatingAverage(ratingNumericValues, 0.5)}</span>
        <div>
          <StarRating ratingValue={Math.round(Number(calculateRatingAverage(ratingNumericValues, 0.5))) ?? 0} isStatic />
          <p className="text-13 text-gray-500 text-light">
            {product.reviews.length > 0 ? `${product.reviews.length} reviews` : 'No reviews'}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        {Object.keys(counts)
          .reverse()
          .map((rating, index) => {
            const invertedCount = 5 - index;
            const totalReviews = ratingNumericValues.length;
            const ratingNumber = parseInt(rating);
            const percentage = (counts[ratingNumber] / totalReviews) * 100;

            return (
              <div key={index} className="flex items-center justify-between gap-3">
                <div className="w-full h-1 bg-[#0000001A]">
                  <div className="h-1 bg-gray-500" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-12 text-center w-4 h-4">{invertedCount}</span>
                  <RiStarFill className="text-gray-300 text-12" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

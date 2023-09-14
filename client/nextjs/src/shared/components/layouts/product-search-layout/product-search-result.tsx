import { UseQueryResult } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TfiMenu } from 'react-icons/tfi';

import { routes } from '@/config/routes';
import Paginate from '@/shared/components/ui/paginate';
import Paper from '@/shared/components/ui/paper';
import StarRating from '@/shared/components/ui/star-rating';
import { DISCOUNT_TYPE, PRODUCT_STOCK_ALERT } from '@/shared/constants';
import { useProduct } from '@/shared/contexts/product.context';
import { envService } from '@/shared/services/env/env.service';
import { ISearchProductsApiResponse } from '@/shared/services/product/product.service.types';
import { calculateRatingAverage } from '@/shared/utils/calculate-rating-average';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

import ProductSearchInput from '../../products/product-search-input';
import WishlistButton from '../../ui/wishlist-button';
import { resolvePageDirection, setDefaultQueryPage } from './utils/resolve-page-direction';

type ProductSearchSectionContentProps = {
  products: UseQueryResult<ISearchProductsApiResponse, unknown>;
};

export default function ProductSearchResult({ products }: ProductSearchSectionContentProps) {
  const router = useRouter();
  const { productSearch, toggleProductSearchMenu } = useProduct();

  useEffect(() => {
    if (!productSearch.page) {
      setDefaultQueryPage({ productSearch, router });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Card List Start */}
      <Paper padding="custom" className="divide-y-1 p-4 lg:p-6">
        <div className="flex items-center justify-start gap-3 w-full mb-4">
          <button onClick={toggleProductSearchMenu}>
            <TfiMenu className="text-24 text-gray-500" />
          </button>
          <ProductSearchInput />
        </div>
        {products.data?.data?.result.map(product => {
          const ratingNumericValues = product?.reviews?.map(item => item.rating) || [];

          return (
            <div key={product._id} className="flex w-full py-4 relative">
              <div>
                <div className="w-[100px] md:w-[140px] lg:w-[160px] xl:w-[180px]">
                  <Link href={routes.productUrl(product)} className="relative w-auto h-32 lg:h-36 flex items-center justify-center">
                    <Image
                      src={getProductImageUrl({
                        pathUrl: `${envService().productImageUrl}`,
                        productImage: product.images.main,
                      })}
                      fill
                      alt={`product-${product.name}`}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex-grow pl-4">
                <Link href={routes.productUrl(product)}>
                  <h2 className="text-15 lg:text-16 font-light mb-1">
                    {product.brand} {product.name}
                  </h2>
                </Link>
                <Link href={routes.productUrl(product)}>
                  <p className="text-13 lg:text-14 font-light line-clamp-2">{product.description}</p>
                </Link>
                <div className="mt-2 flex">
                  <div className="w-1/2">
                    <Link href={routes.productUrl(product)}>
                      <div className="inline-block max-w-full space-y-1">
                        <div>
                          {product.discount.isActive && (
                            <p className="text-12 text-[#757575]">
                              On sale <span className="line-through">{product.pricing.formattedRegularPrice}</span>
                            </p>
                          )}
                          <p className="font-medium text-[#333333] text-16 lg:text-18">{product.pricing.formattedDiscountedPrice}</p>
                        </div>
                        {product.discount.isActive && product.discount.type === DISCOUNT_TYPE.PERCENTAGE ? (
                          <p className="text-[#08875b] text-13">{product.discount.value}% OFF</p>
                        ) : product.discount.isActive && product.discount.type === DISCOUNT_TYPE.FIXED ? (
                          <p className="text-[#08875b] text-13">-{product.pricing.formattedDiscountedPrice}</p>
                        ) : null}
                      </div>
                    </Link>
                    {product.inventory.availableStock < PRODUCT_STOCK_ALERT && (
                      <div className="text-red-500 text-13 font-medium">
                        {product.inventory.availableStock === 0 ? 'Out of stock' : `Only ${product.inventory.availableStock} left in stock`}{' '}
                      </div>
                    )}
                  </div>
                  {/* Reviews */}
                  <div className="w-1/2">
                    <div className="mt-1 items-end lg:items-center justify-end lg:justify-start flex lg:flex-row flex-col lg:gap-2">
                      <StarRating ratingValue={Math.round(Number(calculateRatingAverage(ratingNumericValues, 0.5))) ?? 0} isStatic />
                      <p className="mt-1 text-12 lg:text-13 sm:mt-0 text-[#333333]">
                        {product.reviews.length >= 1 ? `${product.reviews.length} reviews` : 'No reviews'}&nbsp;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <WishlistButton product={product} className="absolute top-3 right-0" />
            </div>
          );
        })}
      </Paper>
      {products.data?.data && (
        <div className="p-6">
          <Paginate
            pagination={products.data?.data.pagination}
            onPageChange={productSearch.handleProductSearchPageChange}
            nextPageFunc={() => resolvePageDirection({ direction: 'next', productSearch, router })}
            prevPageFunc={() => resolvePageDirection({ direction: 'prev', productSearch, router })}
          />
        </div>
      )}
    </>
  );
}

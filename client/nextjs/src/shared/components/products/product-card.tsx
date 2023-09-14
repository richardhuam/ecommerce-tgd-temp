import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';
import StarRating from '@/shared/components/ui/star-rating';
import { DISCOUNT_TYPE, PRODUCT_STOCK_ALERT } from '@/shared/constants';
import { IProduct } from '@/shared/models/product.model';
import { envService } from '@/shared/services/env/env.service';
import { calculateRatingAverage } from '@/shared/utils/calculate-rating-average';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';
import { isNewProduct } from '@/shared/utils/is-product-new';

import AddToCartButton from '../cart/add-to-cart-button';
import WishlistButton from '../ui/wishlist-button';
import NewProductBadge from './new-product-badge';

interface ProductCardProps extends IProduct {
  shadow?: boolean;
  isCarousel?: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const router = useRouter();
  const { shadow = false, isCarousel = false, ...product } = props;

  function handleBuyProduct() {
    router.push(
      {
        pathname: routes.checkout,
        query: {
          product: product._id,
        },
      },
      `${routes.checkout}?product=${product._id}`,
    );
  }
  //calculating the star rating average
  const ratingNumericValues = product?.reviews?.map(item => item.rating) || [];
  const ratingAverage = Math.round(Number(calculateRatingAverage(ratingNumericValues, 1)));

  return (
    <div
      className={`group bg-white relative ${!isCarousel && 'border-gray-200 md:border-[#dcdcdced] max-w-[245px] rounded-md border-1'} ${
        shadow && 'md:shadow-sm md:hover:shadow-lg'
      }`}
    >
      {/* Product Image */}
      <div className="p-3 md:p-4">
        <Link href={routes.productUrl(product)} className="h-[150px] relative w-auto flex items-center justify-center overflow-hidden">
          <Image
            src={getProductImageUrl({ productImage: product.images.main, pathUrl: `${envService().productImageUrl}` })}
            alt={`product-${product.name}`}
            fill
            priority
            className="object-contain md:group-hover:scale-105 transition-all duration-150 delay-100"
          />
        </Link>
      </div>
      {/* Divider */}
      <div className="w-full h-[1px] bg-[#dcdcdced]"></div>
      <div className="p-3 md:p-4 space-y-1 mb-3">
        <div>
          <Link href={routes.productUrl(product)}>
            <p className="font-nunito text-13 text-[#333333] line-clamp-3 md:text-13">
              {product.brand} {product.name} - {product.description}
            </p>
          </Link>
        </div>
        {/* Pricing */}
        <div className="mt-2 relative">
          <Link href={routes.productUrl(product)}>
            <div className="space-y-1 inline-block">
              <p className="text-12 text-[#757575]">
                On sale&nbsp;
                {product.discount.isActive && <span className="line-through">{product.pricing.formattedRegularPrice}</span>}
              </p>
              <div className="flex items-center justify-start gap-2">
                <p className="font-medium text-[#333333]">{product.pricing.formattedDiscountedPrice}</p>
                {product.discount.isActive && product.discount.type === DISCOUNT_TYPE.PERCENTAGE ? (
                  <p className="text-[#08875b] text-13">{product.discount.value}% OFF</p>
                ) : product.discount.isActive && product.discount.type === DISCOUNT_TYPE.FIXED ? (
                  <p className="text-[#08875b] text-13">-{product.pricing.formattedDiscountedPrice}</p>
                ) : null}
              </div>
            </div>
          </Link>
          <WishlistButton shadow={false} product={product} className="absolute bottom-0 right-0" />
        </div>
        <div className="block">
          {product.inventory.availableStock < PRODUCT_STOCK_ALERT ? (
            <div className="text-red-500 text-13 font-medium">
              {product.inventory.availableStock === 0 ? 'Out of stock' : `Only ${product.inventory.availableStock} left in stock`}{' '}
            </div>
          ) : (
            <div className="text-gray-500 text-13 font-medium">
              In stock
              <span className="text-12 font-normal pl-1">({product.inventory.availableStock} available)</span>
            </div>
          )}
        </div>
        {/* Reviews */}
        {product.reviews && (
          <div className="mt-2 items-center justify-between sm:flex">
            <StarRating ratingValue={ratingAverage} />
            <p className="mt-1 text-13 sm:mt-0 text-[#333333]">
              {product.reviews.length >= 1 ? `${product.reviews.length} reviews` : 'No reviews'}
            </p>
          </div>
        )}
        <div className="space-y-3">
          <AddToCartButton product={product} isCard={true} />
          <Button
            onClick={handleBuyProduct}
            disabled={product.inventory.availableStock === 0}
            variant="outline"
            fullWidth
            className="group-hover:bg-primary group-hover:text-white transition-all"
          >
            Buy Now
          </Button>
        </div>
      </div>
      {/* New Product */}
      {isNewProduct(product.createdAt) && <NewProductBadge className="absolute right-2 top-4" />}
    </div>
  );
}

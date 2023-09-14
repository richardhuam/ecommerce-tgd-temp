import { Card, CardBody, CardFooter, Chip, Divider, Image } from '@nextui-org/react';
import { productImageUrlResolver } from '../../product.utils';
import { IProduct } from '../../product.interface';
import { STORE_ROUTES } from '@/config/routes.config';
import { Link } from 'react-router-dom';
import { DISCOUNT_TYPE, PRODUCT_STOCK_ALERT } from '../../product.constant';
import WishlistButton from '@/features/wishlists/components/wishlist-button';
import StarRatingStatic from '@/features/ui/star-rating-static';
import { isNewProduct } from '../../utils/is-product-new.utils';
import AddToCartButton from '../add-to-cart-button';

type ProductCardProps = {
  productData: IProduct;
};

export default function ProductCard({ productData }: ProductCardProps) {
  return (
    <Card
      as="div"
      radius="sm"
      shadow="sm"
      isPressable
      onPress={() => console.log('item pressed')}
      className="group relative"
    >
      <CardBody className="p-3 sm:p-4">
        <Link to={`${STORE_ROUTES.PRODUCTS}/${productData.sku}-${productData.slug}`}>
          <div className="overflow-hidden mb-4">
            <Image
              radius="lg"
              width="100%"
              alt={productData.name}
              className="w-full h-[150px] object-contain md:group-hover:scale-105 transition-all duration-150 delay-100"
              src={productImageUrlResolver(productData.images.main)}
            />
          </div>
          <Divider />
          <div className="pt-2">
            <p className="text-sm text-[#333333] line-clamp-2">
              {productData.brand} {productData.name} - {productData.description}
            </p>
          </div>
        </Link>
        <div className="pt-2 relative">
          <Link to={`${STORE_ROUTES.PRODUCTS}/${productData.sku}-${productData.slug}`}>
            <div className="space-y-1 max-w-[83%]">
              <p className="text-sm text-[#757575]">
                On sale&nbsp;
                {productData.discount.isActive && (
                  <span className="line-through">{productData.pricing.formattedRegularPrice}</span>
                )}
              </p>
              <div className="flex items-center justify-start gap-2">
                <p className="font-semibold text-[#333333]">{productData.pricing.formattedDiscountedPrice}</p>
                {productData.discount.isActive && productData.discount.type === DISCOUNT_TYPE.PERCENTAGE ? (
                  <p className="text-[#08875b] text-sm">{productData.discount.value}% OFF</p>
                ) : productData.discount.isActive && productData.discount.type === DISCOUNT_TYPE.FIXED ? (
                  <p className="text-[#08875b] text-sm">-{productData.pricing.formattedDiscountedPrice}</p>
                ) : null}
              </div>
            </div>
          </Link>
          <WishlistButton className="absolute bottom-0 right-0" />
        </div>
        <Link to={`${STORE_ROUTES.PRODUCTS}/${productData.sku}-${productData.slug}`} className="block pt-2">
          {productData.inventory.availableStock < PRODUCT_STOCK_ALERT ? (
            <div className="text-red-600 text-sm">
              {productData.inventory.availableStock === 0
                ? 'Out of stock'
                : `Only ${productData.inventory.availableStock} left in stock`}{' '}
            </div>
          ) : (
            <div className="text-gray-500 text-sm font-medium">
              In stock
              <span className="text-12 font-normal pl-1">({productData.inventory.availableStock} available)</span>
            </div>
          )}
        </Link>
        <Link
          to={`${STORE_ROUTES.PRODUCTS}/${productData.sku}-${productData.slug}`}
          className="pt-2 items-center justify-between sm:flex"
        >
          <StarRatingStatic ratingValue={3} />
          <p className="mt-1 text-sm sm:mt-0 text-[#333333]">
            {productData.reviews.length >= 1 ? `${productData.reviews.length} reviews` : 'No reviews'}
          </p>
        </Link>
      </CardBody>
      <CardFooter className="">
        <AddToCartButton />
      </CardFooter>
      {isNewProduct(productData.createdAt) && (
        <Chip radius="sm" color="secondary" className="absolute top-3 right-3">
          New
        </Chip>
      )}
    </Card>
  );
}

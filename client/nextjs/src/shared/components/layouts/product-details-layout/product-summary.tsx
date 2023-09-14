import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineHeart } from 'react-icons/hi';

import { routes } from '@/config/routes';
import { DISCOUNT_TYPE, PRODUCT_STOCK_ALERT } from '@/shared/constants';
import { useAuth } from '@/shared/contexts/auth.context';
import { useWishlist } from '@/shared/contexts/wishlist.context';
import { IProduct } from '@/shared/models/product.model';
import { useGetWishlist, useToggleWishlist } from '@/shared/queries/wishlist/wishlist.query';

import AddToCartButton from '../../cart/add-to-cart-button';
import Button from '../../ui/button';

type ProductSummaryProps = {
  product: IProduct;
};

export default function ProductSummary({ product }: ProductSummaryProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { page } = useWishlist();
  const { mutate: wishlistMutate, isLoading } = useToggleWishlist({ selectedProduct: product, page });
  const { data: wishlist } = useGetWishlist({ page });
  const [isItemInWishlist, setIsItemInWishList] = useState<boolean>(false);

  const isProductInWishlist = Boolean(wishlist?.data.collection.find(productId => productId === product._id));

  const isProductOutOfStock = product.inventory.availableStock === 0;

  function toggleProductFromWishlist(product: IProduct) {
    wishlistMutate(product);
    setIsItemInWishList(prev => !prev);
  }

  useEffect(() => {
    setIsItemInWishList(isProductInWishlist);
  }, [router.asPath, isProductInWishlist]);

  function handleBuyProduct() {
    if (isProductOutOfStock) return;
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

  return (
    <>
      <span className="text-gray-400 font-light text-14">New | {product.inventory.soldItems} sold</span>
      <h1 className="font-nunito text-16 font-medium text-[#333333] line-clamp-3 md:text-24">{product.name}</h1>
      <span className=" text-gray-600 font-medium cursor-default text-14">{product.brand}</span>
      <div className="mt-4">
        <div>
          <p className="text-14 font-light text-[#757575]">
            On sale&nbsp;
            {product.discount.isActive && <span className="line-through">{product.pricing.formattedRegularPrice}</span>}
          </p>
          <div className="flex items-center justify-start gap-2">
            <p className="font-medium text-28 text-[#333333]">{product.pricing.formattedDiscountedPrice}</p>
            {product.discount.isActive && product.discount.type === DISCOUNT_TYPE.PERCENTAGE ? (
              <p className="text-[#08875b] font-light text-16">{product.discount.value}% OFF</p>
            ) : product.discount.isActive && product.discount.type === DISCOUNT_TYPE.FIXED ? (
              <p className="text-[#08875b] font-light text-16">-{product.pricing.formattedDiscountedPrice}</p>
            ) : null}
          </div>
        </div>
        {product.inventory.availableStock < PRODUCT_STOCK_ALERT ? (
          <div className="text-red-500 text-14 mt-2">
            {isProductOutOfStock ? 'Out of stock' : `Only ${product.inventory.availableStock} left in stock`}{' '}
          </div>
        ) : (
          <div className="text-gray-500 text-14">
            In stock
            <span className="text-13 font-normal pl-1">({product.inventory.availableStock} available)</span>
          </div>
        )}
      </div>
      <p className="text-14 text-gray-600 mt-3 line-clamp-3">{product.description}</p>
      <div className="mt-4 space-y-1">
        <p className="text-[#757575] text-13">
          SKU: <span className="text-gray-600 font-medium">{product.sku}</span>
        </p>
        <p className="text-[#757575] text-13">
          CATEGORY: <span className="text-gray-600 font-medium">{product.category.name}</span>
        </p>
        <p className="text-[#757575] text-13">
          TOTAL REVIEWS: <span className="text-gray-600 font-medium">{product.reviews.length}</span>
        </p>
      </div>
      <div className="mt-4 gap-3 flex flex-wrap">
        <AddToCartButton product={product} />
        <Button
          variant={isItemInWishlist ? 'normal' : 'outline'}
          loading={isLoading}
          disabled={isLoading}
          onClick={isAuthenticated ? () => toggleProductFromWishlist(product) : () => router.push(routes.login)}
          className="gap-1"
          color="error"
        >
          <HiOutlineHeart className="text-22" />
          {isItemInWishlist ? 'Remove from Wishlist' : 'Add to wishlist'}
        </Button>
      </div>
      <div className="mt-4">
        <Button disabled={isProductOutOfStock} fullWidth onClick={handleBuyProduct}>
          Buy Now
        </Button>
      </div>
    </>
  );
}

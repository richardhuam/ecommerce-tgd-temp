import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

import { routes } from '@/config/routes';
import { useAuth } from '@/shared/contexts/auth.context';
import { useWishlist } from '@/shared/contexts/wishlist.context';
import { IProduct } from '@/shared/models/product.model';
import { useGetWishlist, useToggleWishlist } from '@/shared/queries/wishlist/wishlist.query';

interface WishlistButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  product: IProduct;
  shadow?: boolean;
}

const WishlistButton = forwardRef<HTMLButtonElement, WishlistButtonProps>((props, ref) => {
  const router = useRouter();
  const { className, product, shadow = true, ...rest } = props;
  const { page } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { data: wishlist } = useGetWishlist({ page });
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { mutate: wishlistMutate, isLoading } = useToggleWishlist({ selectedProduct, page });

  function isProductInWishlist(product: IProduct) {
    return Boolean(wishlist?.data.collection.find(id => id === product._id));
  }

  function toggleProductFromWishlist(product: IProduct) {
    setSelectedProduct(product);
    wishlistMutate(product, {
      onError: () => {
        setSelectedProduct(null);
      },
    });
  }
  return (
    <button
      {...rest}
      ref={ref}
      disabled={isLoading}
      onClick={isAuthenticated ? () => toggleProductFromWishlist(product) : () => router.push(routes.login)}
      className={cn(
        `p-1.5 rounded-full bg-white  disabled:bg-gray-100 text-red-500 hover:text-red-400 transition-colors text-24 ${
          shadow && 'shadow-md'
        }`,
        className,
      )}
    >
      {isProductInWishlist(product) ? <HiHeart /> : <HiOutlineHeart />}
    </button>
  );
});

WishlistButton.displayName = 'WishlistButton';

export default WishlistButton;

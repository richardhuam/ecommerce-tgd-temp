import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';

import { routes } from '@/config/routes';
import { useCart } from '@/shared/contexts/cart.context';
import { ICartItems } from '@/shared/models/cart.model';
import { envService } from '@/shared/services/env/env.service';
import { formatCurrency } from '@/shared/utils/format-currency';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

type ShoppingCartItemProps = {
  cartItem: ICartItems;
};

export default function ShoppingCartItem({ cartItem }: ShoppingCartItemProps) {
  const { addItemToCart, decreaseCartItemQuantity, removeItemFromCart, closeCart, getCartItemQuantity } = useCart();

  const maxItemsAdded = cartItem.quantity >= cartItem.product.inventory.maxPurchasePerUser;

  const itemQuantity = getCartItemQuantity(cartItem.product._id);

  function handleAddToCart() {
    if (cartItem.product.inventory.availableStock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    if (cartItem.product.inventory.availableStock <= itemQuantity) {
      toast.error(`There is only ${itemQuantity} items available of this product`);
      return;
    }

    if (maxItemsAdded) {
      toast.error(`You cannot add more than ${cartItem.product.inventory.maxPurchasePerUser} items`);
      return;
    }
    addItemToCart(cartItem.product);
  }

  return (
    <div className="flex items-center justify-center w-full py-6">
      <Link href={routes.productUrl(cartItem.product)} onClick={closeCart}>
        <div className="cursor-pointer relative w-[75px] h-[75px] lg:w-20 lg:h-20">
          <Image
            src={getProductImageUrl({
              productImage: cartItem.product.images.main,
              pathUrl: `${envService().productImageUrl}`,
            })}
            alt={`product-${cartItem.product.name}`}
            fill
            priority
            className="object-contain"
          />
        </div>
      </Link>
      <div className="pl-2 lg:pl-4">
        <Link
          href={routes.productUrl(cartItem.product)}
          onClick={closeCart}
          className="mb-1.5 text-13 lg:text-14 line-clamp-2 leading-[18px] text-gray-700"
        >
          {cartItem.product.name} {cartItem.product.description}
        </Link>
        <div className="flex gap-4 flex-wrap">
          <div className="inline-flex shrink-0 items-center justify-between p-1">
            <button onClick={() => decreaseCartItemQuantity(cartItem.product)} className="bg-gray-100 w-7 h-7  rounded-full">
              -
            </button>
            <span className="inline-flex shrink-0 w-9 items-center justify-center text-15 tracking-tighter">x {cartItem.quantity}</span>
            <button
              onClick={handleAddToCart}
              className={`bg-gray-100 w-7 h-7 rounded-full ${maxItemsAdded ? 'active:scale-110 transition-all duration-150' : ''}`}
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => removeItemFromCart(cartItem.product._id)}
              className="bg-red-400 text-white text-11 font-medium px-2 py-1.5 rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <p className="font-medium pl-2 text-15 lg:text-16 lg:pl-4">
        {formatCurrency(cartItem.product.pricing.discountedPrice * cartItem.quantity)}
      </p>
    </div>
  );
}

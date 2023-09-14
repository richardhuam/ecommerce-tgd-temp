import React from 'react';
import { toast } from 'react-hot-toast';

import { useCart } from '@/shared/contexts/cart.context';
import { IProduct } from '@/shared/models/product.model';

type AddToCartButtonProps = {
  product: IProduct;
  isCard?: boolean;
};

export default function AddToCartButton({ product, isCard = false }: AddToCartButtonProps) {
  const { addItemToCart, decreaseCartItemQuantity, getCartItemQuantity } = useCart();

  const itemQuantity = getCartItemQuantity(product._id);

  const maxItemsAdded = itemQuantity >= product.inventory.maxPurchasePerUser;

  function handleAddItemToCart(product: IProduct) {
    if (product.inventory.availableStock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    if (product.inventory.availableStock <= itemQuantity) {
      toast.error(`There is only ${itemQuantity} items available of this product`);
      return;
    }
    addItemToCart(product);
    toast.success(`${product.name} added to cart x${itemQuantity + 1}`);
  }

  function handleDecreaseCartItemQuantity(product: IProduct) {
    decreaseCartItemQuantity(product);
    if (itemQuantity === 1) {
      toast.success(`${product.name} removed from cart`);
    } else {
      toast.success(`${product.name} added to cart x${itemQuantity - 1}`);
    }
  }

  return itemQuantity > 0 ? (
    <div className={`flex items-center justify-center p-1 bg-primary-600 text-white h-10 rounded-sm ${!isCard ? 'min-w-[190px]' : ''}`}>
      <button onClick={() => handleDecreaseCartItemQuantity(product)} className="rounded-md bg-primary-700 w-8 h-8">
        -
      </button>
      <span className="h-10 flex-grow flex items-center justify-center">{itemQuantity}</span>
      <button
        onClick={() =>
          maxItemsAdded
            ? toast.error(`You cannot add more than ${product.inventory.maxPurchasePerUser} items`)
            : handleAddItemToCart(product)
        }
        className={`rounded-md bg-primary-700 w-8 h-8 text-white ${maxItemsAdded ? 'active:scale-110 transition-all duration-150' : ''}`}
      >
        +
      </button>
    </div>
  ) : (
    <div onClick={() => handleAddItemToCart(product)} className={`flex ${!isCard ? 'min-w-[190px]' : ''}`}>
      <button className="h-10 bg-[#F4F6F8] px-3 rounded-l-md text-13 md:text-14 text-gray-600 flex-grow">Add To Cart</button>
      <button className="w-10 h-10 bg-gray-200 rounded-r-md">+</button>
    </div>
  );
}

import React from 'react';

import { sizeConfig } from '@/config/sizing';
import { useCart } from '@/shared/contexts/cart.context';

import ShoppingCartItem from './shopping-cart-item';

const ShoppingCartContent = () => {
  const { cartItems } = useCart();

  return (
    <div
      className="px-4 md:px-6 lg:px-8 w-full flex items-start justify-start overflow-y-scroll"
      style={{ height: `calc(100vh - ${sizeConfig().cartDrawer.header + sizeConfig().cartDrawer.footer}px)` }}
    >
      <div className="divide-y-1">
        {cartItems.map(item => (
          <ShoppingCartItem key={item.product._id} cartItem={item} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCartContent;

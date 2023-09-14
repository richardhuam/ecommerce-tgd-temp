import { useRouter } from 'next/router';
import React from 'react';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';
import Paper from '@/shared/components/ui/paper';
import { DISCOUNT_TYPE } from '@/shared/constants';
import { useCart } from '@/shared/contexts/cart.context';
import { formatCurrency } from '@/shared/utils/format-currency';

type CartOrderSummaryProps = {};

export default function CartOrderSummary({}: CartOrderSummaryProps) {
  const router = useRouter();
  const { totalPriceCart, cartItems } = useCart();

  return (
    <Paper className="max-w-[400px] 2xl:max-w-full mx-auto divide-y-1">
      <div className="flex items-center justify-between py-3">
        <h3 className="font-medium text-18">Cart Items</h3>
        {/*         <p className="font-semibold text-18">{formatCurrency(subTotal)}</p> */}
      </div>
      <div className="py-5 space-y-2.5  ">
        <h3 className="text-16 font-medium text-gray-700">Products</h3>
        {cartItems.map(item => (
          <div key={item.product._id} className="flex items-center justify-between">
            <div>
              <p className="text-13 leading-5 text-gray-800">
                {item.product.brand} {item.product.name}{' '}
                <span className="tracking-widest">
                  | x{item.quantity} {item.product.discount.isActive ? '|' : null}
                </span>
                {item.product.discount.isActive && item.product.discount.type === DISCOUNT_TYPE.PERCENTAGE ? (
                  <span className="text-red-600 text-12 font-medium">&nbsp;{item.product.discount.value}% OFF</span>
                ) : item.product.discount.isActive && item.product.discount.type === DISCOUNT_TYPE.FIXED ? (
                  <span className="text-red-600 text-12 font-medium">&nbsp;-{item.product.pricing.formattedDiscountedPrice}</span>
                ) : null}
              </p>
            </div>
            <p className="text-14 text-gray-800 ml-4 font-medium">{formatCurrency(item.product.pricing.discountedPrice)}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between py-3">
        <h3 className="font-medium text-18">Subtotal</h3>
        <p className="font-semibold text-18">{formatCurrency(totalPriceCart)}</p>
      </div>
      <Button onClick={() => router.push(routes.checkout)} fullWidth>
        Proceed to Checkout
      </Button>
      <p className="py-3 text-13 text-gray-700 leading-5">You can apply any coupons you have during the checkout process.</p>
    </Paper>
  );
}

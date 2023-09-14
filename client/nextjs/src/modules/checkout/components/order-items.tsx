import React from 'react';

import { SpinnerWithText } from '@/shared/components/ui/spinners/spinner';
import { DISCOUNT_TYPE } from '@/shared/constants';
import { useCheckout } from '@/shared/contexts/checkout.context';

type OrderItemsProps = {};

export default function OrderItems({}: OrderItemsProps) {
  const { validateOrderMutation } = useCheckout();
  return (
    <div className="py-4 space-y-2.5">
      <h3 className="text-16 font-medium text-gray-700">Products</h3>
      {validateOrderMutation.isLoading ? (
        <SpinnerWithText text="Loading products ..." />
      ) : (
        validateOrderMutation.data?.data?.items?.map(item => (
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
            <p className="text-14 text-gray-800 ml-4 font-medium">{item.product.pricing.totalProductPrice}</p>
          </div>
        ))
      )}

      <div className="flex items-center justify-between">
        <p className="font-semibold text-16">Subtotal:</p>
        <p className="font-semibold text-16">{validateOrderMutation.data?.data.subTotalPrice}</p>
      </div>
    </div>
  );
}

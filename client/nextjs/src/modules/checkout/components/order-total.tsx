import React from 'react';

import { useCheckout } from '@/shared/contexts/checkout.context';

type OrderTotalProps = {};

export default function OrderTotal({}: OrderTotalProps) {
  const { validateOrderMutation } = useCheckout();

  return (
    <div className="flex items-center justify-between py-3">
      <h3 className="font-medium text-18">Total</h3>
      <p className="font-semibold text-18">{validateOrderMutation.data?.data.totalPrice}</p>
    </div>
  );
}

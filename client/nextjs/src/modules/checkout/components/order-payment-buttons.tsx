import React from 'react';

import Button from '@/shared/components/ui/button';
import { useCart } from '@/shared/contexts/cart.context';
import { useCheckout } from '@/shared/contexts/checkout.context';

type OrderPaymentButtonsProps = {};

export default function OrderPaymentButtons({}: OrderPaymentButtonsProps) {
  const { updateUserByIdMutation, validateOrderMutation, createStripeSessionMutation } = useCheckout();
  const { isCartItemsLoading } = useCart();
  return (
    <div className="space-y-2">
      <Button
        type="submit"
        fullWidth
        disabled={
          validateOrderMutation.isLoading || createStripeSessionMutation.isLoading || isCartItemsLoading || updateUserByIdMutation.isLoading
        }
      >
        Pay with Stripe
      </Button>
      {/*   <Button type="submit" variant="outline" color="gray" fullWidth disabled={true}>
        Pay with Credit/Debit Card (Soon)
      </Button> */}
    </div>
  );
}

import { useRouter } from 'next/router';
import React from 'react';

import { routes } from '@/config/routes';
import Alert from '@/shared/components/ui/alert';
import { useCart } from '@/shared/contexts/cart.context';

import CheckoutFormContext from '../contexts/checkout-form.context';

type CheckoutSectionProps = {};

export default function CheckoutSection({}: CheckoutSectionProps) {
  const router = useRouter();
  const { isCartItemsLoading, cartQuantity } = useCart();

  const isCheckoutQueryParamsEmpty = Object.keys(router.query).length === 0;

  if (cartQuantity === 0 && isCheckoutQueryParamsEmpty && !isCartItemsLoading)
    return (
      <Alert
        variant="info"
        title="You don't have any product in your cart"
        message="Add some products to proceed to checkout"
        callToAction={{ label: 'Go Shopping', action: () => router.push(routes.home) }}
      />
    );

  return <CheckoutFormContext />;
}

import { useRouter } from 'next/router';
import React from 'react';

import { routes } from '@/config/routes';
import Alert from '@/shared/components/ui/alert';
import { useCart } from '@/shared/contexts/cart.context';

import CartOrderSummary from '../components/cart-order-summary';
import CartTable from '../components/cart-table';

type CartSectionProps = {};

export default function CartSection({}: CartSectionProps) {
  const router = useRouter();
  const { cartItems } = useCart();

  if (cartItems.length === 0)
    return (
      <Alert
        variant="info"
        title="Your cart is empty"
        message="Add some products to your cart"
        callToAction={{ label: 'Search products', action: () => router.push(routes.home) }}
      />
    );
  return (
    <div className="flex gap-4 2xl:flex-row flex-col">
      <CartTable />
      <CartOrderSummary />
    </div>
  );
}

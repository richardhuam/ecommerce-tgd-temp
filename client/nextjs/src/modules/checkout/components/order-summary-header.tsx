import { useRouter } from 'next/router';
import React from 'react';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';

type OrderSummaryHeaderProps = {};

export default function OrderSummaryHeader({}: OrderSummaryHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-3">
      <h2 className="font-semibold text-20">Your Order</h2>
      <Button type="button" size="small" onClick={() => router.push(routes.cart)} variant="outline">
        Go to Cart
      </Button>
    </div>
  );
}

import React from 'react';

import Paper from '@/shared/components/ui/paper';

import CouponForm from './coupon-form';
import OrderCostBreakDown from './order-cost-breakdown';
import OrderItems from './order-items';
import OrderPaymentButtons from './order-payment-buttons';
import OrderSummaryHeader from './order-summary-header';
import OrderTotal from './order-total';

type CheckoutOrderDetailsProps = {};

export default function OrderSummary({}: CheckoutOrderDetailsProps) {
  return (
    <Paper className="w-full md:w-[550px] mx-auto divide-y-1">
      <OrderSummaryHeader />
      <OrderItems /> {/* Done ! */}
      <OrderCostBreakDown /> {/* Done ! */}
      <CouponForm /> {/* Done ! */}
      <OrderTotal /> {/* Done ! */}
      <OrderPaymentButtons /> {/* Done ! */}
    </Paper>
  );
}

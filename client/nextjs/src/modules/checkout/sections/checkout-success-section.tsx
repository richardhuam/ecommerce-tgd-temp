import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';
import SkeletonBase from '@/shared/components/ui/skeleton-base';
import { Spinner } from '@/shared/components/ui/spinners/spinner';
import { PAYMENT_STATUS } from '@/shared/constants/order-status';
import { useAuth } from '@/shared/contexts/auth.context';
import { useError } from '@/shared/hooks/use-error';
import { useValidateOrderPaymentStatus } from '@/shared/queries/order/order.query';
import { authenticateClientSide } from '@/shared/utils/authenticate-client-side';
import { formatDate } from '@/shared/utils/formate-date';

type CheckoutSuccessSectionProps = {
  orderId: string | null;
};

export default function CheckoutSuccessSection({ orderId }: CheckoutSuccessSectionProps) {
  const router = useRouter();
  const { setIsAuthenticated, setMe, isAuthenticated } = useAuth();

  const { mutate: validateOrderPaymentStatusMutate, isLoading, error, data: orderData } = useValidateOrderPaymentStatus();

  const { errorMessage } = useError(error);

  async function authenticateUser() {
    // if server-side authentication fails, then try to authenticate user using client-side
    if (!isAuthenticated) {
      await authenticateClientSide({ setIsAuthenticated, setMe, router });
    }
  }

  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!orderId) {
      router.push(routes.home);
      return;
    }

    if (isAuthenticated) {
      validateOrderPaymentStatusMutate({ orderId });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-start gap-4">
        <h1 className="text-20 md:text-28 lg:mb-2 lg:text-32 font-medium">Processing your payment request. Hold tight for a moment</h1>{' '}
        <Spinner spinnerSize="md" />;
      </div>
    );
  }

  if (errorMessage) {
    return (
      <>
        <h1 className="text-20 md:text-28 lg:mb-2 lg:text-32 font-medium">{errorMessage}</h1>
        <Button onClick={() => router.push(routes.home)}>Go home</Button>
      </>
    );
  }

  if (!orderData?.ok) {
    return (
      <div className="space-y-4">
        <div className="space-y-2 w-full">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-72" />
        </div>
        <SkeletonBase className="h-8 w-32" />
      </div>
    );
  }

  return (
    <>
      {orderData.data.isNewPayment && orderData.data.paymentStatus === PAYMENT_STATUS.PAID ? (
        <div>
          <h1 className="text-24 md:text-28 lg:mb-2 lg:text-32 font-medium">Thank you for your order!</h1>
          <p className="mb-3">Tracking Number: #{orderData.data.trackingNumber.toUpperCase()}</p>
          <Button onClick={() => router.push(routes.orders)}>My Orders</Button>
        </div>
      ) : (
        <div>
          <h1 className="text-20 md:text-28 lg:mb-2 lg:text-32 font-medium">
            Your order has already been paid as of{' '}
            {orderData.data.orderPaidDate && formatDate(orderData.data.orderPaidDate, 'MMMM DD, YYYY')}
          </h1>
          <Button onClick={() => router.push(routes.home)}>Go home</Button>
        </div>
      )}
    </>
  );
}

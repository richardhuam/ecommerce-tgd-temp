import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import LottieSpinnerMulticolor from '@/shared/components/ui/lottie/lottie-spinner-multicolor';
import LoadingModal from '@/shared/components/ui/modals/loading-modal';
import { useAuth } from '@/shared/contexts/auth.context';
import { useCart } from '@/shared/contexts/cart.context';
import { useCheckout } from '@/shared/contexts/checkout.context';
import { ICheckoutFormParams } from '@/shared/models/checkout.model';
import { useCreateOrder } from '@/shared/queries/order/order.query';
import { ICreateOrderApiParams } from '@/shared/services/order/order.service.types';
import { preventEnterKeySubmission } from '@/shared/utils/prevent-enter-key-submission';
import { isValidObjectId } from '@/shared/utils/validate-mongo-id';

import BillingDetailsForm from '../components/billing-details-form';
import OrderSummary from '../components/order-summary';
import { checkoutValidation } from '../utils/checkout-form-validation';
import { formatCreateOrderPayload } from '../utils/format-create-order-payload';
import { getCheckoutDefaultValues } from '../utils/get-checkout-default-values';

type CheckoutFormContextProps = {};

export default function CheckoutFormContext({}: CheckoutFormContextProps) {
  const router = useRouter();
  const { me } = useAuth();
  const { clearCart } = useCart();
  const createOrderMutation = useCreateOrder();

  const {
    selectedCountry,
    multipleProductsOrderPayload,
    singleProductOrderPayload,
    createStripeSessionMutation,
    updateUserByIdMutation,
    selectedPaymentMethod,
  } = useCheckout();

  const methods = useForm<ICheckoutFormParams>({
    resolver: yupResolver(checkoutValidation),
    defaultValues: getCheckoutDefaultValues({ me, selectedCountry, selectedPaymentMethod }),
  });

  const onSubmit = (values: ICheckoutFormParams) => {
    const userPayload = { ...values.user, _id: me._id };
    const isCheckoutQueryParamsEmpty = Object.keys(router.query).length === 0;
    const isSingleProductIdValid = typeof router.query?.product === 'string' && isValidObjectId(router.query.product);

    const isSingleOrder = !isCheckoutQueryParamsEmpty && isSingleProductIdValid;

    const orderProductPayload = isSingleOrder ? { ...singleProductOrderPayload } : { ...multipleProductsOrderPayload };

    const createStripeSessionPayload = {
      ...orderProductPayload,
      couponCode: values.order.coupon.length > 0 ? values.order.coupon : undefined,
      orderNotes: values.order.orderNotes.length > 0 ? values.order.orderNotes : undefined,
      customerId: me._id,
    };

    createStripeSessionMutation.mutate(createStripeSessionPayload, {
      onSuccess: data => {
        updateUserByIdMutation.mutate(userPayload);
        if (data.ok && data.data.stripeSession) {
          const createOrderPayload: ICreateOrderApiParams = formatCreateOrderPayload(data.data);
          createOrderMutation.mutate(createOrderPayload, {
            onSuccess: () => {
              if (!isSingleOrder) {
                clearCart();
              }
              window.location.href = data.data.stripeSession.url;
            },
          });
        }
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} onKeyDown={preventEnterKeySubmission} className="flex gap-4 lg:flex-row flex-col">
          <BillingDetailsForm />
          <OrderSummary />
        </form>
      </FormProvider>
      <LoadingModal
        title="Processing payment, please wait ..."
        isOpen={createStripeSessionMutation.isLoading || updateUserByIdMutation.isLoading || createOrderMutation.isLoading}
        content={<LottieSpinnerMulticolor />}
      />
    </>
  );
}

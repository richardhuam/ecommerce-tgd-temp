import { useMutation, useQuery } from '@tanstack/react-query';

import { CheckoutService } from '@/shared/services/checkout/checkout.service';
import { ICreateStripeSessionApiParams } from '@/shared/services/checkout/checkout.service.types';

export const checkoutKeys = {
  all: ['checkout'] as const,
  stripe: () => [...checkoutKeys.all, 'stripe'] as const,
  stripeSessionById: (stripeSessionId: string) => [...checkoutKeys.stripe(), stripeSessionId] as const,
};

export const useGetStripeSessionById = (stripeSessionId: string) => {
  return useQuery(checkoutKeys.stripeSessionById(stripeSessionId), () => CheckoutService.getStripeSessionById(stripeSessionId), {
    enabled: !!stripeSessionId,
  });
};

export const useCreateStripeSession = () => {
  return useMutation((createStripeSessionApiParams: ICreateStripeSessionApiParams) =>
    CheckoutService.createStripeSession(createStripeSessionApiParams),
  );
};

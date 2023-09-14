import { useMutation, useQuery } from '@tanstack/react-query';
import confetti from 'canvas-confetti';

import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { OrderService } from '@/shared/services/order/order.service';
import {
  ICreateOrderApiParams,
  IGetOrdersApiParams,
  IValidateOrderApiParams,
  IValidateOrderPaymentStatusApiParams,
} from '@/shared/services/order/order.service.types';

export const orderKeys = {
  all: ['order'] as const,
  orders: ({ page }: IGetOrdersApiParams) => [...orderKeys.all, 'orders', { page }] as const,
};

export const useValidateOrder = () => {
  return useMutation((validateOrderApiParams: IValidateOrderApiParams) => OrderService.validateOrder(validateOrderApiParams));
};

export const useCreateOrder = () => {
  return useMutation((createOrderApiParams: ICreateOrderApiParams) => OrderService.createOrder(createOrderApiParams));
};

export const useValidateOrderPaymentStatus = () => {
  const queryClient = getQueryClient();
  return useMutation(
    (validateOrderPaymentStatusApiParams: IValidateOrderPaymentStatusApiParams) =>
      OrderService.validateOrderPaymentStatus(validateOrderPaymentStatusApiParams),
    {
      onSuccess: data => {
        if (data.ok && data.data.isNewPayment) {
          confetti();
          queryClient.invalidateQueries(orderKeys.orders({ page: DEFAULT_QUERY_PAGE }));
        }
      },
    },
  );
};

export const useGetOrders = ({ page }: IGetOrdersApiParams) => {
  return useQuery(orderKeys.orders({ page }), () => OrderService.getOrders({ page }));
};

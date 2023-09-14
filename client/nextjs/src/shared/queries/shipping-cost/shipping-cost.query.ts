import { useQuery } from '@tanstack/react-query';

import { ShippingCostService } from '@/shared/services/shipping-cost/shipping-cost.service';

export const shippingCostKeys = {
  all: ['shipping-cost'] as const,
  getAllShippingCosts: () => [...shippingCostKeys.all] as const,
  getShippingCostById: (shippingCostId: string) => [...shippingCostKeys.all, { shippingCostId }] as const,
};

export const useGetShippingCosts = () => {
  return useQuery(shippingCostKeys.getAllShippingCosts(), ShippingCostService.getShippingCosts);
};

export const useGetShippingCostById = (shippingCostId: string) => {
  return useQuery(shippingCostKeys.getShippingCostById(shippingCostId), () => ShippingCostService.getShippingCostById(shippingCostId), {
    enabled: !!shippingCostId,
  });
};

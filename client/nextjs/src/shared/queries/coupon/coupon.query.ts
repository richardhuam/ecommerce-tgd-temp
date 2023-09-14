import { useMutation } from '@tanstack/react-query';

import { CouponService } from '@/shared/services/coupon/coupon.service';

export const couponKeys = {
  all: ['coupon'] as const,
  //couponByCode: (couponCode: string) => [...couponKeys.all, couponCode] as const,
};

export const useGetCouponByCode = () => {
  return useMutation((couponCode: string) => CouponService.getCouponByCode(couponCode));
};

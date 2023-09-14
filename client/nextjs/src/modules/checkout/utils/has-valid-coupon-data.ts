import { ICoupon } from '@/shared/models/coupon.model';

export function hasValidCouponData(couponData: ICoupon | null) {
  return couponData !== null && couponData.discountValue !== 0;
}

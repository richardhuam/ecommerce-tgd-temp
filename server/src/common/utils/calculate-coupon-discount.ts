import { DISCOUNT_TYPE } from '@common/constants';
import { ICoupon } from '@common/models';

export function calculateCouponDiscount(totalPrice: number, couponData: ICoupon): number {
	if (couponData.discountType === DISCOUNT_TYPE.PERCENTAGE) {
		const discount = (couponData.discountValue / 100) * totalPrice;
		return discount;
	} else if (couponData.discountType === DISCOUNT_TYPE.FIXED) {
		const discount = totalPrice - couponData.discountValue;
		return discount;
	} else {
		const discount = totalPrice - couponData.discountValue;
		return discount;
	}
}

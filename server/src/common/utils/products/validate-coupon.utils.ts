import { ICoupon } from '@common/models';
import { COUPON_STATUS, DISCOUNT_TYPE, ORDER_PAYMENT_METHOD } from '@common/constants';
import { calculateCouponDiscount } from '@common/utils/calculate-coupon-discount';

export function validateCoupon(productsTotalPrice: number, couponDetails: ICoupon | null | undefined, paymentMethod: ORDER_PAYMENT_METHOD) {
	let discountPrice = 0;

	const isCouponExpired =
		couponDetails &&
		typeof couponDetails.maxUses === 'number' &&
		typeof couponDetails.usedCount === 'number' &&
		couponDetails.maxUses - couponDetails.usedCount === 0;

	const isMinAmountDiscountValid = couponDetails && productsTotalPrice >= couponDetails.minOrderAmount;
	const isCouponActive = couponDetails && couponDetails.isActive;
	const isPaymentStripe = paymentMethod === ORDER_PAYMENT_METHOD.STRIPE && couponDetails !== null;

	const couponStatus =
		couponDetails === undefined
			? COUPON_STATUS.NOT_APPLIED
			: couponDetails === null
			? COUPON_STATUS.INCORRECT_COUPON
			: isCouponExpired
			? COUPON_STATUS.EXPIRED
			: !isMinAmountDiscountValid
			? COUPON_STATUS.MIN_AMOUNT_ERROR
			: !isCouponActive
			? COUPON_STATUS.IS_INACTIVE
			: !isPaymentStripe
			? COUPON_STATUS.NOT_APPLICABLE
			: COUPON_STATUS.APPLIED;

	const couponPercentDiscount =
		couponStatus === COUPON_STATUS.APPLIED && couponDetails?.discountType === DISCOUNT_TYPE.PERCENTAGE
			? `${couponDetails.discountValue}%`
			: null;

	const couponMinOrderAmount = couponDetails?.minOrderAmount ?? null;

	if (couponDetails) {
		discountPrice = calculateCouponDiscount(productsTotalPrice, couponDetails);
	}

	return { discountPrice, couponStatus, couponPercentDiscount, couponMinOrderAmount };
}

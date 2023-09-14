import { COUPON_STATUS, PRODUCT_FREE_SHIPPING_COST_LIMIT } from '@common/constants';

interface CalculateOrderTotalsProps {
	discountPrice: number;
	couponStatus: COUPON_STATUS;
	productsTotalPrice: number;
	shippingCostAllProducts: number;
}

export function calculateOrderTotals({
	discountPrice,
	couponStatus,
	productsTotalPrice,
	shippingCostAllProducts,
}: CalculateOrderTotalsProps) {
	const isShippingFree = productsTotalPrice > PRODUCT_FREE_SHIPPING_COST_LIMIT;
	const shippingAmount = !isShippingFree ? shippingCostAllProducts : 0;
	const discountAmount = couponStatus === COUPON_STATUS.APPLIED ? discountPrice : 0;
	const subTotal = productsTotalPrice;
	//const taxesAmount = (PRODUCT_TAX_PERCENT * subTotal) / 100;
	const taxesAmount = 0;
	const totalPrice = subTotal + taxesAmount + shippingAmount - discountAmount;

	return {
		subTotal,
		taxesAmount,
		totalPrice,
		shippingAmount,
		isShippingFree,
		discountAmount,
	};
}

import { DISCOUNT_TYPE } from '@common/constants';
import { IProductPopulated, IProductPopulatedResult } from '@common/models';
import { formatCurrency } from './format-currency';

export function applyProductDiscount(product: IProductPopulated): IProductPopulatedResult {
	let discountedPrice: number;
	let regularPrice: number;

	if (product.discount && product.discount.isActive) {
		const originalPrice = product.price.amount;
		const discountType = product.discount.type;
		const discountValue = product.discount.value;

		if (discountType === DISCOUNT_TYPE.PERCENTAGE) {
			discountedPrice = originalPrice - originalPrice * (discountValue / 100);
		} else if (discountType === DISCOUNT_TYPE.FIXED) {
			discountedPrice = originalPrice - discountValue;
		} else {
			// Handle other types of discounts if needed
			discountedPrice = originalPrice;
		}

		// Round the discountedPrice to two decimal places if necessary
		discountedPrice = Math.round(discountedPrice * 100) / 100;
	} else {
		discountedPrice = product.price.amount; // If no discount, set the discounted price to the original price
	}

	// Regular price is always the original price without any discount
	regularPrice = product.price.amount;

	const productResult = {
		...product,
		pricing: {
			regularPrice: regularPrice,
			formattedRegularPrice: formatCurrency(regularPrice),
			discountedPrice: discountedPrice,
			formattedDiscountedPrice: formatCurrency(discountedPrice),
		},
	} as IProductPopulatedResult;

	return productResult;
}

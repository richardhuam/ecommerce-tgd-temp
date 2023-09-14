import { IPopulatedOrderProductWithQuantity, IShippingCost } from '@common/models';

interface CalculateOrderTotalsProps {
	products: IPopulatedOrderProductWithQuantity[];
	shippingDetails: IShippingCost | null;
}

export function calculateProductsTotalPrice({ products, shippingDetails }: CalculateOrderTotalsProps) {
	let shippingCostAllProducts = 0;
	let itemsQuantity = 0;

	const productsTotalPrice = products.reduce((total, cartItem) => {
		const productPrice = cartItem.product.pricing.discountedPrice || 0;
		// accumulate the shipping cost of every product
		shippingCostAllProducts += (shippingDetails?.baseCost || 0) * cartItem.quantity;
		// sum the products quantity
		itemsQuantity += cartItem.quantity;

		return total + productPrice * cartItem.quantity;
	}, 0);

	return { productsTotalPrice, shippingCostAllProducts, itemsQuantity };
}

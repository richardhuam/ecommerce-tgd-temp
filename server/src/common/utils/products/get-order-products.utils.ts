import { ProductModel } from '@features/products/schema/product.schema';
import { ReviewModel } from '@features/reviews/schema/review.schema';
import { applyProductDiscount } from '@common/utils/products/apply-product-discount';
import { IPopulatedOrderProductWithQuantity, IProductPopulated } from '@common/models';
import { formatCurrency } from '@common/utils/products/format-currency';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateStripeSessionDto } from '@features/checkout/dto/create-stripe-session';

interface GetOrderProductsProps {
	products: CreateStripeSessionDto['products'];
	productModel: ProductModel;
	reviewModel: ReviewModel;
}

export async function getOrderProducts({
	productModel,
	products = [],
	reviewModel,
}: GetOrderProductsProps): Promise<IPopulatedOrderProductWithQuantity[]> {
	const productsData = await Promise.all(
		products.map(async (item) => {
			const foundProduct = (await productModel
				.findById(item.productId)
				.populate<IProductPopulated>({
					path: 'category',
					model: productModel,
					options: { strictPopulate: false },
				})
				.populate<IProductPopulated>({
					path: 'reviews',
					model: reviewModel,
					options: { strictPopulate: false },
				})
				.lean()
				.exec()) as IProductPopulated;

			if (!foundProduct) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

			const stockAvailable = foundProduct.inventory.availableStock >= item.quantity;

			if (!stockAvailable) {
				throw new HttpException('PRODUCT_OUT_OF_STOCK', HttpStatus.BAD_REQUEST);
			}

			const productWithDiscount = applyProductDiscount(foundProduct);

			const productPayload: IPopulatedOrderProductWithQuantity['product'] = {
				_id: productWithDiscount._id,
				name: productWithDiscount.name,
				description: productWithDiscount.description,
				brand: productWithDiscount.brand,
				slug: productWithDiscount.slug,
				discount: productWithDiscount.discount,
				pricing: {
					...productWithDiscount.pricing,
					totalProductPrice: formatCurrency(productWithDiscount.pricing.discountedPrice * item.quantity),
				},
				sku: productWithDiscount.sku,
			};

			return {
				product: productPayload,
				quantity: item.quantity,
			};
		}),
	);
	return productsData;
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from '@features/products/schema/product.schema';
import { Wishlist, WishlistModel } from './schema/wishlist.schema';
import { IAddToWishlist, IGetWishlistItems } from './interfaces/product.interface';
import { IUser, IWishlistPopulated } from '@common/models';
import { OkResponse } from '@common/utils';
import { applyProductDiscount } from '@common/utils/products/apply-product-discount';

@Injectable()
export class WishlistService {
	constructor(
		@InjectModel(Product.name) private readonly productModel: ProductModel,
		@InjectModel(Wishlist.name) private readonly wishlistModel: WishlistModel,
	) {}

	async getAllWishlistItems({ req, res, page, limit }: IGetWishlistItems) {
		const user = req.user as IUser;

		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		let where = { owner: user._id };

		const wishlist = (await this.wishlistModel
			.findOne(where)
			.populate<IWishlistPopulated>({
				path: 'products',
				model: this.productModel,
				options: { strictPopulate: false },
			})
			.lean()
			.exec()) as IWishlistPopulated | null;

		if (!wishlist) throw new HttpException('WISHLIST_NOT_FOUND', HttpStatus.NOT_FOUND);

		const products = wishlist.products.reverse();

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		const totalCount = products.length;

		const totalPages = Math.ceil(totalCount / queryLimit);

		const paginatedProducts = productsWithDiscount.slice((queryPage - 1) * queryLimit, queryPage * queryLimit);

		return res.status(HttpStatus.OK).json(
			OkResponse({
				pagination: {
					currentPage: queryPage,
					hasNextPage: queryPage !== totalPages,
					totalItems: totalCount,
					limit: queryLimit,
					totalPages,
				},
				collection: products.map((item) => item['_id']),
				result: paginatedProducts,
			}),
		);
	}

	async toggleWishlistItem({ productId, req, res }: IAddToWishlist) {
		const user = req.user as IUser;

		const product = await this.productModel.findById(productId).lean();

		if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		const wishlistRegistered = await this.wishlistModel.findOne({ owner: user._id });

		const productAlreadyAdded = wishlistRegistered.products.find((id) => id.toString() === productId);

		const updateQuery = { owner: user._id };

		const wishlistUpdate = { $push: { products: productId } };
		const wishlistRemoval = { $pull: { products: productId } };

		const options = { new: true };

		await this.wishlistModel.findOneAndUpdate(updateQuery, productAlreadyAdded ? wishlistRemoval : wishlistUpdate, options);

		const status = productAlreadyAdded ? 'removed' : 'added';

		return res.status(HttpStatus.OK).json(
			OkResponse({
				status,
				productId,
			}),
		);
	}
}

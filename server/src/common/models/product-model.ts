import { DISCOUNT_TYPE, SHIPPING_METHOD } from '@common/constants';
import mongoose, { ObjectId, Types } from 'mongoose';
import { IUser } from './user.model';

export type IProductVariants = {
	name: string;
	options: string[];
};

export type IProductPricing = {
	amount: number;
	currency: string;
};

export type IProductCategory = {
	_id: ObjectId;
	name: string;
	description: string;
	image: string;
	slug: string;
	code: string;
	position: string;
	createdAt: string;
	updatedAt: string;
};

export type IProductInventory = {
	totalStock: number;
	soldItems: number;
	availableStock: number;
	maxPurchasePerUser: number;
};

export type IProductDiscount = {
	isActive: boolean;
	type: DISCOUNT_TYPE;
	value: number;
};

export type IProductImages = {
	main: string;
	sub?: string[];
};

export type IProductReview = {
	_id: Types.ObjectId;
	author: Types.ObjectId;
	rating: number;
	comment?: string;
};

export type IProductSpecifications = {
	[key: string]: string;
};

export interface IProduct {
	_id: ObjectId;
	name: string;
	brand: string;
	category: ObjectId;
	description: string;
	price: IProductPricing;
	sku: string;
	slug: string;
	inventory: IProductInventory;
	images: {
		main: string;
		subs: string[];
	};
	discount: IProductDiscount;
	score: number;
	views: number;
	lastSoldDate: Date | null;
	reviews: ObjectId;
	variants: IProductVariants[];
	specifications?: IProductSpecifications;
}

export interface IProductPopulated extends Omit<IProduct, 'category' | 'reviews'> {
	category: IProductCategory;
	reviews: IProductReview[];
}

export interface IProductPricingDetails {
	regularPrice: number;
	formattedRegularPrice: string;
	discountedPrice: number;
	formattedDiscountedPrice: string;
	totalProductPrice: string;
}

export interface IProductPopulatedResult extends IProductPopulated {
	pricing: IProductPricingDetails;
}

export interface ICoupon {
	code: string;
	discountType: DISCOUNT_TYPE;
	discountValue: number;
	maxUses: number;
	usedCount: number;
	usedByUsers: mongoose.Schema.Types.ObjectId;
	isSingleUse: boolean;
	minOrderAmount: number;
	isActive: boolean;
}

export interface ICouponPopulated extends Omit<ICoupon, 'usedByUsers'> {
	usedByUsers: IUser;
}

export interface IShippingCost {
	shippingMethod: SHIPPING_METHOD;
	baseCost: number;
	description: string;
}

export interface IPopulatedOrderProductWithQuantity {
	product: Pick<IProductPopulatedResult, '_id' | 'name' | 'description' | 'brand' | 'slug' | 'discount' | 'pricing' | 'sku'>;
	quantity: number;
}

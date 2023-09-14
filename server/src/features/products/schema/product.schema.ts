import { COLLECTION_NAMES, DISCOUNT_TYPE } from '@common/constants';
import {
	IProductDiscount,
	IProductImages,
	IProductInventory,
	IProductPricing,
	IProductSpecifications,
	IProductVariants,
} from '@common/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;
export type ProductModel = Model<ProductDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.PRODUCT,
})
export class Product {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	brand: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
	category: mongoose.Schema.Types.ObjectId;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true, type: mongoose.Schema.Types.Mixed })
	price: IProductPricing;

	@Prop({ required: true })
	sku: string;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.Mixed,
		default: {
			isActive: Boolean,
			type: DISCOUNT_TYPE,
			value: 0,
		},
	})
	discount: IProductDiscount;

	@Prop({ required: true })
	slug: string;

	@Prop({ required: true, default: 0 })
	score: number;

	@Prop({ required: true, default: 0 })
	views: number;

	@Prop({ required: false, default: null })
	lastSoldDate: mongoose.Schema.Types.Date;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.Mixed,
		default: {
			availableStock: 0,
			maxPurchasePerUser: 5,
			soldItems: 0,
			totalStock: 0,
		} as IProductInventory,
	})
	inventory: IProductInventory;

	@Prop({ required: true, type: mongoose.Schema.Types.Mixed })
	images: IProductImages;

	@Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }])
	reviews: mongoose.Schema.Types.ObjectId;

	@Prop({ required: true, type: mongoose.Schema.Types.Mixed, default: [] })
	variants: IProductVariants[];

	@Prop({ required: false, type: mongoose.Schema.Types.Mixed })
	specifications: IProductSpecifications;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

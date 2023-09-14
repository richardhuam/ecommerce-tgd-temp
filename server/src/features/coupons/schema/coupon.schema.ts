import { COLLECTION_NAMES, DISCOUNT_TYPE } from '@common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;
export type CouponAttributes = Partial<keyof Coupon>;
export type CouponModel = Model<CouponDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.COUPON,
})
export class Coupon {
	@Prop({ required: true })
	code: string;

	@Prop({
		required: true,
		enum: [DISCOUNT_TYPE.PERCENTAGE, DISCOUNT_TYPE.FIXED],
		default: DISCOUNT_TYPE.PERCENTAGE,
	})
	discountType: DISCOUNT_TYPE;

	@Prop({ required: true })
	discountValue: number;

	@Prop({ required: true, default: 1 })
	maxUses: number;

	@Prop({ required: true, default: 0 })
	usedCount: number;

	@Prop([
		{
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
	])
	usedByUsers: mongoose.Schema.Types.ObjectId;

	@Prop({ required: true, default: false })
	isSingleUse: boolean;

	@Prop({ required: true })
	minOrderAmount: number;

	@Prop({ required: true, default: true })
	isActive: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

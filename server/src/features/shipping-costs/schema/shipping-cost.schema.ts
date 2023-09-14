import { COLLECTION_NAMES, SHIPPING_METHOD } from '@common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type ShippingCostDocument = HydratedDocument<ShippingCost>;
export type ShippingCostModel = Model<ShippingCostDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.SHIPPING_COST,
})
export class ShippingCost {
	@Prop({
		required: true,
		enum: [SHIPPING_METHOD.STANDARD, SHIPPING_METHOD.EXPRESS],
	})
	shippingMethod: SHIPPING_METHOD;

	@Prop({ required: true })
	baseCost: number;

	@Prop({ required: false })
	description: string;
}

export const ShippingCostSchema = SchemaFactory.createForClass(ShippingCost);

import { COLLECTION_NAMES } from '@common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type WishlistDocument = HydratedDocument<Wishlist>;
export type WishlistModel = Model<WishlistDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.WISHLIST,
})
export class Wishlist {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	})
	owner: mongoose.Schema.Types.ObjectId;

	@Prop([
		{
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: 'products',
		},
	])
	products: [mongoose.Schema.Types.ObjectId];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);

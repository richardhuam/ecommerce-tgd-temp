import { COLLECTION_NAMES } from '@common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;
export type ReviewModel = Model<ReviewDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.REVIEW,
})
export class Review {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	})
	author: mongoose.Schema.Types.ObjectId;

	@Prop({
		required: true,
		type: String,
	})
	product: string;

	@Prop({
		type: Number,
		min: 1,
		max: 5,
		required: true,
	})
	rating: number;

	@Prop({ required: false, default: null })
	comment: string;

	@Prop({ required: false, default: 0 })
	likes: number;

	@Prop({ required: false, default: 0 })
	dislikes: number;

	@Prop({ required: false, default: false })
	reported: boolean;

	@Prop({ required: false, default: null })
	reportReason: string;

	@Prop({ required: false, default: 0 })
	reportCount: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

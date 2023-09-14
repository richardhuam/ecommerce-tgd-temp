import { COLLECTION_NAMES } from '@common/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
export type CategoryModel = Model<CategoryDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.CATEGORY,
})
export class Category {
	@Prop({ required: true })
	name: string;

	@Prop({ required: false })
	description: string;

	@Prop({ required: false })
	image: string;

	@Prop({ required: true })
	slug: string;

	@Prop({ required: true })
	code: string;

	@Prop()
	position: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', async function (next) {
	if (this.isNew) {
		const CategoryModel = this.constructor as CategoryModel;
		const lastCategory = await CategoryModel.findOne({}, {}, { sort: { position: -1 } });
		const nextPosition = lastCategory ? lastCategory.position + 1 : 1;
		this.position = nextPosition;
	}
	next();
});

import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [
		mongooseForFeatureContainer([
			collections[0].products,
			collections[0].categories,
			collections[0].reviews,
			collections[0].users,
			collections[0].orders,
		]),
	],
	controllers: [ReviewsController],
	providers: [ReviewsService],
})
export class ReviewsModule {}

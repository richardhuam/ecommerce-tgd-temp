import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].categories, collections[0].products, collections[0].reviews])],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}

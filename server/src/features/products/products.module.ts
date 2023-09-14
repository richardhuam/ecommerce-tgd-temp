import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [
		mongooseForFeatureContainer([
			collections[0].products,
			collections[0].categories,
			collections[0].reviews,
			collections[0].users,
			collections[0].shippingCost,
		]),
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}

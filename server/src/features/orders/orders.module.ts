import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';
import { CheckoutService } from '@features/checkout/checkout.service';

@Module({
	imports: [
		mongooseForFeatureContainer([
			collections[0].products,
			collections[0].categories,
			collections[0].reviews,
			collections[0].shippingCost,
			collections[0].coupons,
			collections[0].users,
			collections[0].orders,
		]),
	],
	controllers: [OrdersController],
	providers: [OrdersService, CheckoutService],
})
export class OrdersModule {}

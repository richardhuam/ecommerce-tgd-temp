import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [
		mongooseForFeatureContainer([
			collections[0].products,
			collections[0].reviews,
			collections[0].shippingCost,
			collections[0].coupons,
			collections[0].users,
		]),
	],
	controllers: [CheckoutController],
	providers: [CheckoutService],
	exports: [CheckoutService],
})
export class CheckoutModule {}

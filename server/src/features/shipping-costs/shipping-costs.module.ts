import { Module } from '@nestjs/common';
import { ShippingCostsService } from './shipping-costs.service';
import { ShippingCostsController } from './shipping-costs.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].users, collections[0].products, collections[0].shippingCost])],
	controllers: [ShippingCostsController],
	providers: [ShippingCostsService],
})
export class ShippingCostsModule {}

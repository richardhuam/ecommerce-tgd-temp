import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].products, collections[0].coupons])],
	controllers: [CouponsController],
	providers: [CouponsService],
})
export class CouponsModule {}

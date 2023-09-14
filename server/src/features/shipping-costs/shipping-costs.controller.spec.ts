import { Test, TestingModule } from '@nestjs/testing';
import { ShippingCostsController } from './shipping-costs.controller';
import { ShippingCostsService } from './shipping-costs.service';

describe('ShippingCostsController', () => {
	let controller: ShippingCostsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShippingCostsController],
			providers: [ShippingCostsService],
		}).compile();

		controller = module.get<ShippingCostsController>(ShippingCostsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

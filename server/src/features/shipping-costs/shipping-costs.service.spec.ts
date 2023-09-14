import { Test, TestingModule } from '@nestjs/testing';
import { ShippingCostsService } from './shipping-costs.service';

describe('ShippingCostsService', () => {
	let service: ShippingCostsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ShippingCostsService],
		}).compile();

		service = module.get<ShippingCostsService>(ShippingCostsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

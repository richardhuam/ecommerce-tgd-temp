import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ShippingCostsService } from './shipping-costs.service';
import { CreateShippingCostDto } from './dto/create-shipping-cost.dto';
import { ObjectIdValidationPipe } from '@common/pipes/object-id-validation.pipe';
import { JwtAuthGuard } from '@common/guards/jwt-auth';

@Controller('shipping-costs')
export class ShippingCostsController {
	constructor(private readonly shippingCostsService: ShippingCostsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createShippingCost(@Body() createShippingCostDto: CreateShippingCostDto) {
		return await this.shippingCostsService.createShippingCost(createShippingCostDto);
	}

	@Get()
	async getAllShippingCosts() {
		return await this.shippingCostsService.getAllShippingCosts();
	}

	@Get(':shippingCostId')
	async getShippingCostById(@Param('shippingCostId', ObjectIdValidationPipe) shippingCostId: string) {
		return await this.shippingCostsService.getShippingCostById(shippingCostId);
	}
}

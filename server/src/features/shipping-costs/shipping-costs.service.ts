import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShippingCostDto } from './dto/create-shipping-cost.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingCost } from './entities/shipping-cost.entity';
import { ShippingCostModel } from './schema/shipping-cost.schema';
import { OkResponse, capitalizeFirstLetter } from '@common/utils';
import { formatCurrency } from '@common/utils/products/format-currency';

@Injectable()
export class ShippingCostsService {
	constructor(@InjectModel(ShippingCost.name) private readonly shippingCostModel: ShippingCostModel) {}

	async createShippingCost(createShippingCostDto: CreateShippingCostDto) {
		const foundShippingMethod = await this.shippingCostModel.findOne({ shippingMethod: createShippingCostDto.shippingMethod }).lean();

		if (!foundShippingMethod) throw new HttpException('SHIPPING_METHOD_DUPLICATE', HttpStatus.BAD_REQUEST);

		const newShippingCost = await this.shippingCostModel.create(createShippingCostDto);

		return OkResponse(newShippingCost);
	}

	async getAllShippingCosts() {
		const shipingCosts = await this.shippingCostModel.find().lean();

		const formattedShippingCosts = shipingCosts.map((item) => {
			if (shipingCosts.length > 0) {
				const shippingMethodWithPrice = `${capitalizeFirstLetter(item.shippingMethod)} - ${formatCurrency(item.baseCost)}`;

				return { ...item, shippingMethodWithPrice };
			} else {
				return item;
			}
		});
		return OkResponse(formattedShippingCosts);
	}

	async getShippingCostById(shippingCostId: string) {
		const shippingCost = await this.shippingCostModel.findById(shippingCostId).lean();

		if (!shippingCost) throw new HttpException('SHIPPING_COST_NOT_FOUND', HttpStatus.NOT_FOUND);
		return OkResponse(shippingCost);
	}
}

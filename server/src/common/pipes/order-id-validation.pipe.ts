import { OrderIdPrefix } from '@common/utils/products/create-order-id';
import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrderIdValidationPipe implements PipeTransform<any, string> {
	transform(value: string): string {
		if (!value.startsWith(OrderIdPrefix)) {
			throw new HttpException('INVALID_ORDER_ID', HttpStatus.BAD_REQUEST);
		}

		return value.toUpperCase();
	}
}

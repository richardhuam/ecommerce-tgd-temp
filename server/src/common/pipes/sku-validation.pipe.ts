import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SkuValidationPipe implements PipeTransform<any, string> {
	transform(value: any): string {
		const skuLength = 17;
		if (!value) {
			throw new HttpException('PRODUCT_SKU_REQUIRED', HttpStatus.BAD_REQUEST);
		}

		if (value.length !== skuLength) {
			throw new HttpException(`PRODUCT_SKU_MIN_LENGTH`, HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

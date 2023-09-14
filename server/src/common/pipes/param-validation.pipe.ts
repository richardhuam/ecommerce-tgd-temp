import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ParamValidationPipe implements PipeTransform<any, string> {
	transform(value: string): string {
		if (!value) {
			throw new HttpException('REQUEST_PARAM_REQUIRED', HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

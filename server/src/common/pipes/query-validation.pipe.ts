import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class QueryValidationPipe implements PipeTransform<any, string> {
	constructor(private readonly query: string) {}
	transform(value: string): string {
		if (!value) {
			throw new HttpException('QUERY_PARAM_REQUIRED', HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

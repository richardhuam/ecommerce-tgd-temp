import { HttpException, HttpStatus } from '@nestjs/common';

export class ExtendedHttpException extends HttpException {
	constructor(response: string | object, status: HttpStatus, additionalProperties: Record<string, any>) {
		super(response, status);
		Object.assign(this, additionalProperties);
	}

	getAdditionalProperties(): Record<string, any> {
		return Object.assign({}, this);
	}
}

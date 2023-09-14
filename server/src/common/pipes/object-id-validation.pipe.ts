import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<any, Types.ObjectId> {
	transform(value: any): Types.ObjectId {
		const validObjectId = Types.ObjectId.isValid(value);

		if (!validObjectId) {
			throw new HttpException('INVALID_MONGO_ID', HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}

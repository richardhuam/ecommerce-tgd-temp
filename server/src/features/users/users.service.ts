import { IRequestAndResponse, IUser } from '@common/models';
import { OkResponse } from '@common/utils';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserRolesDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserModel } from './schema/user.schema';
import { Product, ProductModel } from '@features/products/schema/product.schema';
@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: UserModel,
		@InjectModel(Product.name) private readonly productModel: ProductModel,
	) {}

	async getAllUsers() {
		const users = await this.userModel.find();
		return OkResponse(users);
	}

	async getUserDetails({ req, res }: IRequestAndResponse) {
		const me = req.user as IUser;

		const user = await this.userModel.findById(me._id).select({ password: 0 }).lean().exec();

		if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		return res.status(HttpStatus.OK).json(OkResponse(user));
	}

	async assignRoleToUser(userId: string, dto: UpdateUserRolesDto) {
		const user = await this.userModel.findById(userId).lean();

		if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		const update = { role: dto.role };
		const userWithNewRole = await this.userModel.findByIdAndUpdate(userId, update, { new: true }).lean();

		return OkResponse(userWithNewRole);
	}

	async updateUserDetails(userId: string, dto: UpdateUserDto) {
		const user = await this.userModel.findById(userId).select({ password: 0 }).lean();

		if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		if (Object.keys(dto).length === 0) throw new HttpException('UPDATE_USER_AT_LEAST_ONE_PARAMETER', HttpStatus.BAD_REQUEST);

		const updatedUser = await this.userModel.findByIdAndUpdate(user['_id'], dto, { new: true }).lean();

		return OkResponse(updatedUser);
	}
}

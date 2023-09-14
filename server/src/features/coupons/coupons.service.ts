import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponModel } from './schema/coupon.schema';
import { OkResponse } from '@common/utils';
import { IApplyCoupon, IGetCouponWithQueryParams } from './interfaces/coupon.interface';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { IUser } from '@common/models';

@Injectable()
export class CouponsService {
	constructor(@InjectModel(Coupon.name) private readonly couponModel: CouponModel) {}

	async getCouponByCode(couponCode: string) {
		const coupon = await this.couponModel.findOne({ code: couponCode }).lean();

		if (!coupon) throw new HttpException('COUPON_NOT_FOUND', HttpStatus.NOT_FOUND);
		if (coupon.maxUses - coupon.usedCount === 0) throw new HttpException('COUPON_USAGE_LIMIT_REACHED', HttpStatus.BAD_REQUEST);

		return OkResponse(coupon);
	}

	async applyCoupon({ couponCode, req, res }: IApplyCoupon) {
		const user = req.user as IUser;

		const coupon = await this.couponModel.findOne({ code: couponCode }).lean();

		if (!coupon) throw new HttpException('COUPON_NOT_FOUND', HttpStatus.NOT_FOUND);

		if (coupon.maxUses - coupon.usedCount === 0) throw new HttpException('COUPON_USAGE_LIMIT_REACHED', HttpStatus.BAD_REQUEST);

		const couponAlreadyUsedByUser = await this.couponModel.findOne({ usedByUsers: { $in: [user._id] } });
		if (couponAlreadyUsedByUser) throw new HttpException('COUPON_ALREADY_USED', HttpStatus.BAD_REQUEST);

		const couponIdentifier = { code: new RegExp(couponCode, 'i') };
		const couponUpdate = { $push: { usedByUsers: user._id } };
		const options = { new: true };

		const updatedCouponResult = await this.couponModel.findOneAndUpdate(couponIdentifier, couponUpdate, options);
		if (!updatedCouponResult) throw new HttpException('COUPON_NOT_FOUND', HttpStatus.NOT_FOUND);

		return res.status(HttpStatus.OK).json(OkResponse(updatedCouponResult));
	}

	async createCoupon(createCouponDto: CreateCouponDto) {
		const isCouponAlreadyRegistered = await this.couponModel.findOne({ code: createCouponDto.code });

		if (isCouponAlreadyRegistered) throw new HttpException('DUPLICATE_COUPON_CODE', HttpStatus.BAD_REQUEST);

		const coupon = await this.couponModel.create(createCouponDto);

		return OkResponse(coupon);
	}

	async getAllCoupons({ limit, page }: IGetCouponWithQueryParams) {
		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalCoupons = await this.couponModel.countDocuments();

		const totalPages = Math.ceil(totalCoupons / queryLimit);

		const coupons = await this.couponModel
			.find()
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.exec();

		return OkResponse({
			pagination: {
				currentPage: queryPage,
				hasNextPage: queryPage !== totalPages,
				totalItems: totalCoupons,
				totalPages,
				limit: queryLimit,
			},
			result: coupons,
		});
	}
}

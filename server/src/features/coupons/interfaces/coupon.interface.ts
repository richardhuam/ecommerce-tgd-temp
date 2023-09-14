import { IRequestAndResponse } from '@common/models';

export type IGetCouponWithQueryParams = {
	page: string;
	limit: string;
};

export interface IApplyCoupon extends IRequestAndResponse {
	couponCode: string;
}

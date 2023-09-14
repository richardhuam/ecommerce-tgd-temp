import { IQueryParameters, IRequestAndResponse } from '@common/models';

export interface IAddToWishlist extends IRequestAndResponse {
	productId: string;
}

export type IGetWishlistItems = IRequestAndResponse & IQueryParameters;

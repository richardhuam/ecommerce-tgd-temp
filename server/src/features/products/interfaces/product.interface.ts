import { CreateProductDto } from '../dto/create-product.dto';
import { IRequestAndResponse } from '@common/models';

export type ICreateProduct = {
	path: string;
	files: Express.Multer.File[];
	createProductDto: CreateProductDto;
};

export type IProductQueries = { keyWord: string; page: string; limit: string };

export interface IAddToWishlist extends IRequestAndResponse {
	productId: string;
}

export type IGetBestSellersWithPagination = {
	page: string;
	limit: string;
};

export type IGetNewArrivalsWithPagination = {
	page: string;
	limit: string;
};

export type IGetTrendingProductsWithPagination = {
	page: string;
	limit: string;
};

export interface IViewProduct extends IRequestAndResponse {
	productId: string;
}

export type IValidateCart = Array<{
	id: string;
	quantity: number;
}>;

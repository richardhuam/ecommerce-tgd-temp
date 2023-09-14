import { IProductCategory } from '@common/models';
import { generateRandomString } from './generate-random-string';
import { CreateProductDto } from '@features/products/dto/create-product.dto';

type CreateProductSKUProps = {
	createProductDto: CreateProductDto;
	productCategory: IProductCategory;
};

export function createProductSKU({ createProductDto, productCategory }: CreateProductSKUProps) {
	const categoryCode = productCategory.code;
	const brandCode = createProductDto.brand.substring(0, 2).toUpperCase();
	const productNameCode = createProductDto.name.substring(0, 2).toUpperCase();
	const randomString = generateRandomString(4).toUpperCase();

	return `${categoryCode}${brandCode}${productNameCode}${randomString}`;
}

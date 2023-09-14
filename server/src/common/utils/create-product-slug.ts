import { CreateProductDto } from '@features/products/dto/create-product.dto';

export function createProductSlug(createProductDto: CreateProductDto): string {
	return `${createProductDto.brand}-${createProductDto.name}`;
}

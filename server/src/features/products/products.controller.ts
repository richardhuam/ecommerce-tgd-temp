import {
	Controller,
	Get,
	Post,
	Body,
	UseInterceptors,
	ParseFilePipe,
	MaxFileSizeValidator,
	UploadedFiles,
	Query,
	Param,
	UseGuards,
	Req,
	Res,
	Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { envConfig } from '@config/environment';
import { QueryValidationPipe } from '@common/pipes/query-validation.pipe';
import { ObjectIdValidationPipe } from '@common/pipes/object-id-validation.pipe';
import { SkuValidationPipe } from '@common/pipes/sku-validation.pipe';
import { JwtAuthGuard } from '@common/guards/jwt-auth';
import { Roles } from '@common/decorators';
import { ROLES } from '@common/constants';
import { RolesGuard } from '@common/guards/role-guard';
import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get('best-sellers')
	async getBestSellersWithPagination(@Query('page') page: string, @Query('limit') limit: string) {
		if (page && limit) {
			return await this.productsService.getBestSellersWithPagination({ page, limit });
		} else {
			return await this.productsService.getBestSellers();
		}
	}

	@Get('new-arrivals')
	async getNewArrivals(@Query('page') page: string, @Query('limit') limit: string) {
		if (page && limit) {
			return await this.productsService.getNewArrivalsWithPagination({ page, limit });
		} else {
			return await this.productsService.getNewArrivals();
		}
	}

	@Get('trending-products')
	async getTrendingProducts(@Query('page') page: string, @Query('limit') limit: string) {
		if (page && limit) {
			return await this.productsService.getTrendingProductsWithPagination({ page, limit });
		} else {
			return await this.productsService.getTrendingProducts();
		}
	}

	@Post('view-product/:productId')
	async viewProduct(@Param('productId', ObjectIdValidationPipe) productId: string) {
		return await this.productsService.viewProduct(productId);
	}

	@Get('search')
	async searchProducts(
		@Query('keyword', new QueryValidationPipe('keyword')) keyWord: string,
		@Query('page') page: string,
		@Query('limit') limit: string,
	) {
		return await this.productsService.searchProducts({ keyWord, page, limit });
	}

	@Post('validate-cart')
	async validateCart(@Body() cartPayloadDto: Array<{ productId: string; quantity: number }>) {
		return await this.productsService.validateCart(cartPayloadDto);
	}

	@Get('sku/:productSku')
	async getProductBySKU(@Param('productSku', SkuValidationPipe) productSku: string) {
		return await this.productsService.getProductBySku(productSku);
	}

	//TODO Update product --> PUT updateProduct
	//TODO Delete product --> PUT deleteProduct

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([ROLES.ADMIN])
	@Post()
	@UseInterceptors(FilesInterceptor('images'))
	createProduct(
		@UploadedFiles(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 5000000 })] }))
		files: Express.Multer.File[],
		@Body()
		createProductDto: CreateProductDto,
	) {
		const path = envConfig().aws.s3.productImagesPath;
		return this.productsService.createProduct({ path, files, createProductDto });
	}

	@Get(':productId')
	async getProductById(@Param('productId', ObjectIdValidationPipe) productSlug: string) {
		return await this.productsService.getProductById(productSlug);
	}

	@Get(':productId/recommended')
	async getRecommendedProducts(@Param('productId', ObjectIdValidationPipe) productId: string) {
		return await this.productsService.getRecommendedProducts(productId);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':productId/wishlist')
	async toggleWishlistItem(@Param('productId', ObjectIdValidationPipe) productId: string, @Req() req: Request, @Res() res: Response) {
		return await this.productsService.toggleWishlistItem({ req, res, productId });
	}
}

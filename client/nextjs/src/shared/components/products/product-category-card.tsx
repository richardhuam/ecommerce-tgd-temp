import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/config/routes';
import { IProductCategory } from '@/shared/models/product.model';
import { envService } from '@/shared/services/env/env.service';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

import Button from '../ui/button';

export default function ProductCategoryCard(category: IProductCategory) {
  return (
    <Link
      href={routes.productCategoriesUrl(category._id)}
      className="group md:hover:-translate-y-1 ease-in-out transition-all duration-300 overflow-hidden flex rounded-md bg-white lg:shadow-[#f0f0f0] shadow-sm lg:hover:shadow-md border-1 border-[#f1f1f1] h-[155px] md:h-[170px] lg:h-[190px] xl:h-[195px]"
    >
      <div className="flex w-full flex-col items-start justify-between py-4 p-4 2xl:py-6 2xl:p-6">
        <h2 className="text-16 md:text-17 md:tracking-wider uppercase text-gray-700 md:line-clamp-3 line-clamp-2">{category.name}</h2>
        <Button variant="outline">Watch Products</Button>
      </div>
      <div className="relative flex w-[190px] lg:w-[250px] h-full items-center justify-end">
        <Image
          src={getProductImageUrl({ productImage: category.image, pathUrl: `${envService().productCategoryImagesUrl}` })}
          alt="banner-card"
          fill
          priority
          className="object-cover object-left"
        />
      </div>
    </Link>
  );
}

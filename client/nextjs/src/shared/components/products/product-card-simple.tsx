import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/config/routes';
import { DISCOUNT_TYPE } from '@/shared/constants';
import { IProduct } from '@/shared/models/product.model';
import { envService } from '@/shared/services/env/env.service';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

import WishlistButton from '../ui/wishlist-button';

interface ProductCardSimpleProps extends IProduct {
  isCarousel?: boolean;
}

export default function ProductCardSimple(props: ProductCardSimpleProps) {
  const { isCarousel = false, ...product } = props;

  return (
    <div className={`group bg-white relative ${!isCarousel && 'border-gray-200 md:border-[#dcdcdced] max-w-[245px] rounded-md border-1'}`}>
      {/* Product Image */}
      <div className="p-3 md:p-4">
        <Link href={routes.productUrl(product)} className="h-[150px] relative w-auto flex items-center justify-center overflow-hidden">
          <Image
            src={getProductImageUrl({ productImage: product.images.main, pathUrl: `${envService().productImageUrl}` })}
            alt={`product-${product.name}`}
            fill
            priority
            className="object-contain md:group-hover:scale-105 transition-all duration-150 delay-100"
          />
        </Link>
      </div>
      {/* Divider */}
      <div className="w-full h-[1px] bg-[#dcdcdced]"></div>
      <div className="p-3 md:p-4 space-y-3 mb-3">
        <div>
          <Link href={routes.productUrl(product)}>
            <p className="font-nunito text-13 text-[#333333] line-clamp-3 md:text-13">
              {product.brand} {product.name} - {product.description}
            </p>
          </Link>
        </div>
        {/* Pricing */}
        <div className="mt-2 relative">
          <Link href={routes.productUrl(product)}>
            <div className="space-y-1 inline-block">
              <p className="text-12 text-[#757575]">
                On sale&nbsp;
                {product.discount.isActive && <span className="line-through">{product.pricing.formattedRegularPrice}</span>}
              </p>
              <div className="flex gap-2 items-center justify-start">
                <p className="font-medium text-[#333333]">{product.pricing.formattedDiscountedPrice}</p>
                {product.discount.isActive && product.discount.type === DISCOUNT_TYPE.PERCENTAGE ? (
                  <p className="text-[#08875b] text-13">{product.discount.value}% OFF</p>
                ) : product.discount.isActive && product.discount.type === DISCOUNT_TYPE.FIXED ? (
                  <p className="text-[#08875b] text-13">-{product.pricing.formattedDiscountedPrice}</p>
                ) : null}
              </div>
            </div>
          </Link>
          <WishlistButton shadow={false} product={product} className="absolute bottom-0 right-0" />
        </div>
      </div>
    </div>
  );
}

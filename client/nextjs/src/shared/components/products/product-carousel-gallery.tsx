import Image from 'next/image';
import React, { useState } from 'react';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
// import required modules
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/shared/models/product.model';
import { envService } from '@/shared/services/env/env.service';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';

type ProductCarouselGalleryProps = {
  product: IProduct | undefined;
};

export default function ProductCarouselGallery({ product }: ProductCarouselGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  if (!product) return null;

  const allProductImages = [product.images.main, ...product.images.subs];

  return (
    <>
      <Swiper
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        speed={400}
        className="mb-4 relative"
      >
        {allProductImages.map((image, idx, array) => (
          <SwiperSlide key={idx} className="flex items-center justify-center">
            <div className="relative w-300 h-300 md:w-400 md:h-400 mx-auto">
              <Image
                src={getProductImageUrl({ pathUrl: `${envService().productImageUrl}`, productImage: image })}
                alt={`${idx}-${image}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute top-0 left-0">
              <span className="bg-slate-100 rounded-md px-4 text-15 py-1.5 z-body-2 inline-flex leading-none items-center justify-center cursor-default shadow-sm">
                {idx + 1}/{array.length}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={2}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="max-w-[400px]"
      >
        {allProductImages.map((image, idx) => (
          <SwiperSlide
            key={idx}
            className="border-1 hover:border-black transition-colors duration-200 ease-in-out flex items-center justify-center"
          >
            <div className="relative h-20 w-20 cursor-pointer">
              <Image
                src={getProductImageUrl({ pathUrl: `${envService().productImageUrl}`, productImage: image })}
                alt={image}
                fill
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

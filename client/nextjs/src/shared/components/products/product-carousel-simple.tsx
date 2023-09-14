import { useRef } from 'react';
import SwiperCore, { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/shared/models/product.model';

import ProductCardSimple from './product-card-simple';
import { productCarouselBreakpoints } from './utils/product-carousel-breakpoints';

type ProductCarouselSimpleProps = {
  productSlideData: IProduct[];
};

export default function ProductCarouselSimple({ productSlideData = [] }: ProductCarouselSimpleProps) {
  const swiperRef = useRef<SwiperCore>();

  return (
    <>
      <Swiper
        slidesPerView="auto"
        onBeforeInit={swiper => {
          swiperRef.current = swiper;
        }}
        modules={[FreeMode, Navigation]}
        breakpoints={productCarouselBreakpoints}
        speed={1000}
        className="relative product-swiper"
      >
        {productSlideData.map(item => (
          <SwiperSlide key={item._id} className="max-w-[200px] md:max-w-[245px] 2xl:max-w-none product-swiper-slide">
            <ProductCardSimple {...item} isCarousel />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

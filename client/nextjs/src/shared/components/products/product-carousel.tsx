import { useRef } from 'react';
import SwiperCore, { FreeMode, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/shared/models/product.model';

import { NextSlideButton, PrevSlideButton } from '../ui/slide-buttons';
import ProductCard from './product-card';
import { productCarouselBreakpoints } from './utils/product-carousel-breakpoints';

type CarouselScrollerProps = {
  productSlideData: IProduct[];
};

export default function ProductCarousel({ productSlideData = [] }: CarouselScrollerProps) {
  const swiperRef = useRef<SwiperCore>();

  return (
    <>
      <NextSlideButton swiperRef={swiperRef} />
      <PrevSlideButton swiperRef={swiperRef} />
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
            <ProductCard {...item} isCarousel />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

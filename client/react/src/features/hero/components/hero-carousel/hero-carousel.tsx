import { useRef } from 'react';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HeroNextSlideButton, HeroPrevSlideButton } from './hero-carousel-buttons';
import { heroCarouselData } from './hero-carousel.data';
import HeroCarouselContent from './hero-carousel-content';
import Container from '@/features/layouts/container';

export default function HeroCarousel() {
  const swiperRef = useRef<SwiperCore>();
  return (
    <div className="h-[400px] xl:h-[530px] text-white relative select-none mb-2 md:mb-4">
      <div className="h-[352px] xl:h-[475px] bg-main-carousel banner-clip-extra-small md:banner-clip-small xl:banner-clip">
        <Container className="relative">
          <HeroNextSlideButton swiperRef={swiperRef} />
          <HeroPrevSlideButton swiperRef={swiperRef} />
          <Swiper
            onBeforeInit={swiper => {
              swiperRef.current = swiper;
            }}
            speed={1000}
            loop={true}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{
              el: '.swiper-custom-pagination',
              clickable: true,
            }}
            allowTouchMove={true}
            slidesPerView={1}
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            className="h-[352px] xl:h-[475px]"
          >
            {heroCarouselData.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <HeroCarouselContent {...item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </div>
      <div className="swiper-custom-pagination" />
    </div>
  );
}

import { useRef } from 'react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NextSlideButton, PrevSlideButton } from '../../ui/slide-buttons';
import { heroCarouselMock } from './hero-carousel.mock';
import HeroSlideContent from './sub-components/hero-slide-content';

export default function HeroCarousel() {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="h-[400px] xl:h-[530px] text-white relative select-none mb-2 md:mb-4">
      <div className="h-[352px] xl:h-[475px] bg-primary-900 banner-clip-extra-small md:banner-clip-small xl:banner-clip">
        <div className="main-container relative">
          <NextSlideButton isMain isTransparent swiperRef={swiperRef} />
          <PrevSlideButton isMain isTransparent swiperRef={swiperRef} />
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
            {heroCarouselMock.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <HeroSlideContent {...item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="swiper-custom-pagination" />
    </div>
  );
}

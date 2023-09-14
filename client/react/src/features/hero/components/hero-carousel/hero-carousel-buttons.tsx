import { ChevronRight, ChevronLeft } from 'lucide-react';
import { FC, MutableRefObject } from 'react';
import SwiperCore from 'swiper';

interface Props {
  swiperRef: MutableRefObject<SwiperCore | undefined>;
}

export const HeroNextSlideButton: FC<Props> = ({ swiperRef }) => {
  return (
    <button
      className="z-body-2 hidden xl:flex absolute right-0 top-[45%] rounded-full h-12 w-12 items-center justify-center transition-colors ease-in-out bg-[#EAEAEA33] hover:bg-[#cac9c933] text-white"
      onClick={() => swiperRef.current?.slideNext()}
    >
      <ChevronRight />
    </button>
  );
};

export const HeroPrevSlideButton: FC<Props> = ({ swiperRef }) => {
  return (
    <button
      className="z-body-2 hidden xl:flex absolute left-0 top-[45%] rounded-full h-12 w-12 items-center justify-center transition-colors ease-in-out bg-[#EAEAEA33] hover:bg-[#cac9c933] text-white"
      onClick={() => swiperRef.current?.slidePrev()}
    >
      <ChevronLeft />
    </button>
  );
};

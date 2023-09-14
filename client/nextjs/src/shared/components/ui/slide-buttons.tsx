import { FC, MutableRefObject } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import SwiperCore from 'swiper';

interface Props {
  swiperRef: MutableRefObject<SwiperCore | undefined>;
  isTransparent?: boolean;
  isMain?: boolean;
}

export const NextSlideButton: FC<Props> = ({ swiperRef, isTransparent, isMain }) => {
  return (
    <button
      className={`z-body-2 absolute right-0 top-[45%] rounded-full h-12 w-12 items-center justify-center transition-colors ease-in-out ${
        isTransparent ? 'bg-[#EAEAEA33] hover:bg-[#cac9c933] text-white' : 'bg-white border-gray-100 border-1 shadow-slide-button'
      } ${isMain ? 'hidden xl:flex' : 'hidden md:flex'}`}
      onClick={() => swiperRef.current?.slideNext()}
    >
      <IoChevronForwardOutline />
    </button>
  );
};

export const PrevSlideButton: FC<Props> = ({ swiperRef, isTransparent, isMain }) => {
  return (
    <button
      className={`z-body-2 absolute left-0 top-[45%] rounded-full h-12 w-12 items-center justify-center transition-colors ease-in-out ${
        isTransparent ? 'bg-[#EAEAEA33] hover:bg-[#cac9c933] text-white' : 'bg-white border-gray-100 border-1 shadow-slide-button'
      } ${isMain ? 'hidden xl:flex' : 'hidden md:flex'}`}
      onClick={() => swiperRef.current?.slidePrev()}
    >
      <IoChevronBackOutline />
    </button>
  );
};

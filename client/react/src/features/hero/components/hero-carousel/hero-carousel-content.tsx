type HeroCarouselContentProps = {
  title: string;
  description: string;
  image: string;
};

export default function HeroCarouselContent({ description, image, title }: HeroCarouselContentProps) {
  return (
    <div className="flex h-full items-center justify-between xl:px-8 animate-fade-right animate-once">
      <div className="max-w-[65%] md:max-w-[55%] lg:max-w-[45%] h-full flex items-start justify-start pt-10 sm:pt-14 md:pt-0 md:justify-center flex-col">
        <h1 className="line-clamp-3 text-24 sm:text-25 md:text-35 xl:text-[50px] font-medium leading-7 sm:leading-8 md:leading-10 xl:leading-[58px]">
          {title}
        </h1>
        <p className="line-clamp-2 mt-2 text-15 md:text-18 font-light mb-4">{description}</p>
      </div>
      <div className="max-w-[35%] md:max-w-[45%] lg:max-w-[55%]">
        <img
          src={image}
          alt={`shop-model-${title}`}
          className="absolute -right-16 xl:right-0 bottom-0 w-[335px] sm:w-96 md:w-[430px] xl:w-auto"
        />
      </div>
    </div>
  );
}

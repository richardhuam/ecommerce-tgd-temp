import Link from 'next/link';
import React from 'react';

import { useGetLimitedTrendingProducts } from '@/shared/queries/product/product.query';

/* import { renderToStaticMarkup } from 'react-dom/server'; */
import Button from '../ui/button';

interface ProductSectionContainerWitBackgroundProps {
  children: React.ReactNode;
  title: string;
  description: string;
  url: string;
}

export default function ProductSectionContainerWitBackground({
  children,
  title = '',
  description = '',
  url = '/',
}: ProductSectionContainerWitBackgroundProps) {
  const { data: products, isLoading, isError } = useGetLimitedTrendingProducts();

  return (
    <section className="mx-auto relative mb-8 flex w-full items-center justify-center py-11 xl:max-w-[2000px]">
      <div
        className={`absolute top-0 w-full bg-gray-200 xl:max-w-[2000px] ${
          (products?.data.length !== 0 && !isError) || isLoading ? 'h-[370px]' : ''
        } `}
      />
      <div className="main-container !z-body relative">
        <div className="w-full xs:w-[95%] md:w-full">
          <div className="mb-2 md:mb-0">
            <h2 className="leading-6 text-xl font-semibold text-black xs:text-20 md:text-26">{title}</h2>
          </div>
          <div className="mb-5 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
            <p className="text-gray-700 text-14 md:text-16">{description}</p>
            {!isLoading && !isError && (
              <Link href={url}>
                <Button variant="custom" className="border-gray-700 border-1 text-gray-700">
                  Watch more
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

import { Transition } from '@headlessui/react';
import { UseQueryResult } from '@tanstack/react-query';
import { Fragment, useEffect, useRef } from 'react';

import { useProduct } from '@/shared/contexts/product.context';
import { useClickOutside } from '@/shared/hooks/use-click-outside';
import { useWindowSize } from '@/shared/hooks/use-window-size';
import { ISearchProductsApiResponse } from '@/shared/services/product/product.service.types';

import ProductSearchAsideContent from './product-search-aside-content';
import ProductSearchResult from './product-search-result';

type SearchProductLayoutProps = {
  products: UseQueryResult<ISearchProductsApiResponse, unknown>;
};

export default function ProductSearchLayout({ products }: SearchProductLayoutProps) {
  const wrapperRef = useRef(null);
  const { closeProductSearchResultMenu, isProductSearchResultMenuOpen } = useProduct();
  const windowSize = useWindowSize();

  const isMobileSize = windowSize.width !== undefined && windowSize.width <= 768;

  useEffect(() => {
    if (isMobileSize) {
      closeProductSearchResultMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileSize]);

  useClickOutside(wrapperRef, closeProductSearchResultMenu);

  return (
    <div className="overflow-hidden container md:px-4">
      <div className="flex md:mt-8">
        <Transition
          as={Fragment}
          show={isProductSearchResultMenuOpen}
          enter="transform transition duration-[100ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[100ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <aside
            ref={isMobileSize ? wrapperRef : null}
            className="fixed p-4 h-full md:h-auto z-body-2 bg-gray-100 md:bg-transparent md:static flex w-[250px] min-w-[250px] xl:w-[280px] xl:min-w-[280px] pr-4 shadow-sidebar md:shadow-none"
          >
            <ProductSearchAsideContent products={products} isMobileSize={isMobileSize} />
            <button
              onClick={closeProductSearchResultMenu}
              className="block md:hidden bg-gray-600 rounded-md font-semibold h-8 w-8 text-white text-15 border-1 border-gray-100 absolute right-2 top-2"
            >
              ✕
            </button>
          </aside>
        </Transition>
        <section className="w-full transition-all duration-[400ms]">
          <ProductSearchResult products={products} />
        </section>
      </div>
    </div>
  );
}

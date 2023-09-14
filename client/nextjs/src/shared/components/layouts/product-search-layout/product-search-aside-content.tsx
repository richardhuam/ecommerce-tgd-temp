import { UseQueryResult } from '@tanstack/react-query';
import Link from 'next/link';

import { routes } from '@/config/routes';
import { useProduct } from '@/shared/contexts/product.context';
import { ISearchProductsApiResponse } from '@/shared/services/product/product.service.types';
import { toTitleCase } from '@/shared/utils/sanitize-strings';

type ProductSearchAsideContent = {
  products: UseQueryResult<ISearchProductsApiResponse, unknown>;
  isMobileSize: boolean;
};

export default function ProductSearchAsideContent({ products, isMobileSize }: ProductSearchAsideContent) {
  const { closeProductSearchResultMenu, productSearch } = useProduct();

  const uniqueBrands = Array.from(new Set(products.data?.data.result.map(item => item.brand)));

  return (
    <div>
      <h2 className="text-gray-600 mb-1">Showing Results for:</h2>
      <div className="space-y-1">
        <p className="text-20 font-medium leading-7">{toTitleCase(productSearch.keyWord)}</p>
        <p className="text-light text-13 text-[#757575]">{products.data?.data.result.length} results</p>
      </div>

      <div className="space-y-4 mt-4">
        {/* Tags */}
        <div>
          <div className="flex items-center justify-start flex-wrap gap-2">
            {uniqueBrands.map((brand, idx) => (
              <span
                key={idx}
                className="bg-white text-gray-700 font-medium shadow-sm rounded-sm cursor-default text-13 px-2.5 py-1.5 inline-flex leading-none items-center justify-center"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Price Range */}
        {/*  <div>
          <h3 className="text-15 font-medium mb-0.5">Price</h3>
          <ul className="space-y-1">
            {priceRange.map((price, idx) => (
              <li key={idx} className="text-gray-500 text-light text-13 flex items-center justify-start">
                {price.to ? `$${price.from} - $${price.to}` : `More than $${price.from}`}&nbsp;&nbsp;
                <input type="checkbox" />
              </li>
            ))}
          </ul>
        </div> */}
        {/* Brands */}
        <div>
          <h3 className="text-15 font-medium mb-0.5">Brands</h3>
          <ul className="space-y-1">
            {uniqueBrands.map((brand, idx) => (
              <li key={idx} className="text-gray-500 text-light text-13">
                {brand}&nbsp;
                <span className="text-gray-400">({products.data?.data.result.filter(item => item.brand === brand).length})</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Models */}
        <div>
          <h3 className="text-15 font-medium mb-0.5">Products</h3>
          <ul className="space-y-1">
            {products.data?.data.result.map((product, idx) => (
              <li key={idx} className="text-gray-500 text-light text-13 hover:underline">
                <Link href={routes.productUrl(product)} onClick={isMobileSize ? closeProductSearchResultMenu : () => {}}>
                  {product.name}&nbsp;
                  {/*                   <span className="text-gray-400">({products.data?.data.result.filter(item => item.name === product.name).length})</span> */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

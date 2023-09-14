import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

import ProductGrid from '@/shared/components/products/product-grid';
import Alert from '@/shared/components/ui/alert';
import Button from '@/shared/components/ui/button';
import Paginate from '@/shared/components/ui/paginate';
import { useGetTrendingProducts } from '@/shared/queries/product/product.query';

type ProductTrendingSectionProps = {};

export default function ProductTrendingSection({}: ProductTrendingSectionProps) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { data: trendingProducts, isLoading } = useGetTrendingProducts({ page });

  const trendingProductsData = trendingProducts?.data.result ?? [];

  function handlePageChange(page: number) {
    setPage(page);
  }

  return (
    <div className="container px-1 md:px-4">
      <div className="relative mb-4 px-3 mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
        <h1 className="pt-14 md:pt-0 md:text-center font-semibold text-20 md:text-22 lg:text-25 text-primary uppercase mb-1">
          Trending Products
        </h1>
        <Button
          onClick={() => router.back()}
          variant="custom"
          className="absolute right-2 md:right-0 top-0 hover:bg-primary hover:text-white border-1 text-primary border-primary"
        >
          <IoArrowBackOutline className="text-20" />
          &nbsp;Go Back
        </Button>
      </div>
      {trendingProducts?.data.result.length === 0 && !isLoading ? (
        <Alert title="No products found" message="Seems like there are still not products registered with this category" />
      ) : (
        <>
          <ProductGrid products={trendingProductsData} />
          {trendingProducts?.data.pagination && (
            <div className="mt-4 lg:mt-6">
              <Paginate onPageChange={handlePageChange} pagination={trendingProducts.data.pagination} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

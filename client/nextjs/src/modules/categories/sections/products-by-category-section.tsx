import { useRouter } from 'next/router';
import { IoArrowBackOutline } from 'react-icons/io5';

import ProductGrid from '@/shared/components/products/product-grid';
import Alert from '@/shared/components/ui/alert';
import Button from '@/shared/components/ui/button';
import { useGetCategoryById, useGetProductsByCategoryId } from '@/shared/queries/category/category.query';

export default function ProductsByCategorySection() {
  const router = useRouter();
  const categoryId = (router.query?.categoryId as string) ?? 'no-product-id-found';

  const products = useGetProductsByCategoryId(categoryId);
  const category = useGetCategoryById(categoryId);

  const productData = products.data?.data ?? [];

  return (
    <div className="container px-1 md:px-4">
      <div className="relative mb-4 px-3 mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
        <div className="pt-14 md:pt-0">
          <h1 className="md:text-center font-semibold text-20 md:text-22 lg:text-25 text-primary uppercase mb-1">
            {category.data?.data.name}
          </h1>
          <p className="md:text-center text-gray-600 text-14 md:text-15 lg:text-16">{category.data?.data.description}</p>
        </div>
        <Button
          onClick={() => router.back()}
          variant="custom"
          className="absolute right-2 md:right-0 top-0 hover:bg-primary hover:text-white border-1 text-primary border-primary"
        >
          <IoArrowBackOutline className="text-20" />
          &nbsp;Go Back
        </Button>
      </div>
      {productData.length === 0 && !products.isLoading ? (
        <Alert title="No products found" message="Seems like there are still not products registered with this category" />
      ) : (
        <ProductGrid products={productData} />
      )}
    </div>
  );
}

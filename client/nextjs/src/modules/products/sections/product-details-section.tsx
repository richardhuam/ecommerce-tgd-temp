import { useRouter } from 'next/router';
import React from 'react';

import { routes } from '@/config/routes';
import ProductDetailsLayout from '@/shared/components/layouts/product-details-layout/product-details-layout';
import Alert from '@/shared/components/ui/alert';
import { useProduct } from '@/shared/contexts/product.context';
import { useGetProductBySku } from '@/shared/queries/product/product.query';

type ProductDetailsSectionProps = {};

export default function ProductDetailsSection({}: ProductDetailsSectionProps) {
  const router = useRouter();
  const { productSkuFromSlug } = useProduct();
  const { data: product, isError } = useGetProductBySku(productSkuFromSlug);

  if (isError || !product) {
    return (
      <div className="main-container mt-8">
        <Alert
          variant="error"
          title="Failed to render Product details"
          message="Seems like the products you're trying to rerach does not exists"
          callToAction={{ label: 'Go home', action: () => router.push(routes.home) }}
        />
      </div>
    );
  }

  return <ProductDetailsLayout product={product.data} />;
}

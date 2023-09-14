import React from 'react';

import ProductCardSkeleton from '@/shared/components/products/product-card-skeleton';
import ProductCarouselSimple from '@/shared/components/products/product-carousel-simple';
import ProductSectionContainer from '@/shared/components/products/product-section-container';
import Alert from '@/shared/components/ui/alert';
import { useCore } from '@/shared/contexts/core.context';
import { IProduct } from '@/shared/models/product.model';
import { useGetRecommendedProducts } from '@/shared/queries/product/product.query';

type ProductRecommendedSectionProps = {
  product: IProduct;
};

export default function ProductRecommendedSection({ product }: ProductRecommendedSectionProps) {
  const { data, error, isLoading, refetch } = useGetRecommendedProducts(product._id);

  const { data: recommendedProducts = [] } = data ?? {};

  const { isFakeDelayLoading } = useCore();

  let content;

  if (isLoading || !isFakeDelayLoading) {
    content = <ProductCardSkeleton qty={5} />;
  } else if (error) {
    content = (
      <Alert
        callToAction={{ label: 'Retry', action: () => refetch() }}
        variant="error"
        title="Oops, something went wrong"
        message="Failed to load recommended products. Please try again later."
      />
    );
  } else {
    content = <ProductCarouselSimple productSlideData={recommendedProducts} />;
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <ProductSectionContainer container={false} title="Recommended Products">
      {content}
    </ProductSectionContainer>
  );
}

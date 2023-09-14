import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ProductRecommendedSection from '@/modules/products/sections/product-recommended-section';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import { useViewedProducts } from '@/shared/hooks/use-viewed-products';
import { IProduct } from '@/shared/models/product.model';
import { useViewProduct } from '@/shared/queries/product/product.query';

import ProductCarouselGallery from '../../products/product-carousel-gallery';
import BackgroundOneSVG from '../../svg/background-one-svg';
import Paper from '../../ui/paper';
import ProductDescription from './components/product-description';
import ProductReviews from './components/product-reviews/product-reviews';
import ProductSummary from './product-summary';

type ProductDetailsLayoutProps = {
  product: IProduct;
};

export default function ProductDetailsLayout({ product }: ProductDetailsLayoutProps) {
  const abstractBackground = encodeURIComponent(renderToStaticMarkup(<BackgroundOneSVG />));
  const { viewedProducts, markProductAsViewed, loading } = useViewedProducts();
  const { mutate: viewProductMutate } = useViewProduct();

  const hasViewed = viewedProducts.includes(product._id);

  function incrementViewCount(productId: string) {
    markProductAsViewed(productId);
    viewProductMutate(productId);
  }

  useEffect(() => {
    if (!loading && !hasViewed) {
      incrementViewCount(product._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasViewed, product._id]);

  return (
    <div>
      <div className="bg-primary-800 h-80 w-full" style={{ backgroundImage: `url("data:image/svg+xml,${abstractBackground}")` }}></div>
      <div className="container">
        <Paper className="-mt-60 space-y-8 md:space-y-10">
          {/* Product title */}
          <Breadcrumb title={`${product.name}`} />
          {/* Product layout */}
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
            <div className="w-full md:w-[55%]">
              <ProductCarouselGallery product={product} />
            </div>
            <div className="w-full md:w-[45%] md:pl-4">
              <ProductSummary product={product} />
            </div>
          </div>
          {/* Description */}
          <ProductDescription product={product} />
          {/* Reviews */}
          <ProductReviews product={product} />
          {/* Recommended Products */}
          <ProductRecommendedSection product={product} />
        </Paper>
      </div>
    </div>
  );
}

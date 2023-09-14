import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import ProductDetailsSection from '@/modules/products/sections/product-details-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { productKeys } from '@/shared/queries/product/product.query';
import { reviewKeys } from '@/shared/queries/reviews/review.query';
import { ProductService } from '@/shared/services/product/product.service';
import { ReviewService } from '@/shared/services/reviews/review.service';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';
import { getSlugFirstParam } from '@/shared/utils/get-product-sku-from-slug';

const ProductSlugPage: NextPageWithLayout = () => {
  return (
    <PageWrapper container={false} hasPadding={false}>
      <ProductDetailsSection />
    </PageWrapper>
  );
};

ProductSlugPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default ProductSlugPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const page = DEFAULT_QUERY_PAGE;
  const queryClient = getQueryClient();
  const session = await getUserSessionSsr(context);

  const productSku = getSlugFirstParam(context.params?.productSlug);

  await Promise.all([
    await queryClient.prefetchQuery(productKeys.productBySku(productSku), () => ProductService.getProductBySku(productSku)),
    await queryClient.prefetchQuery(reviewKeys.reviews({ productSku, page }), () => ReviewService.getReviews({ page, productSku })),
  ]);

  if (session.isAuthenticated) {
    await queryClient.prefetchQuery(reviewKeys.pendingReviewsAsCollection(), () => ReviewService.getPendingReviewsAsCollection());
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

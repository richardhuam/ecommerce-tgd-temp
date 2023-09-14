import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import ProductsByCategorySection from '@/modules/categories/sections/products-by-category-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { categoryKeys } from '@/shared/queries/category/category.query';
import { CategoryService } from '@/shared/services/category/category.service';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';
import { getSlugFirstParam } from '@/shared/utils/get-product-sku-from-slug';

const ProductCategorySlugPage: NextPageWithLayout = () => {
  return (
    <PageWrapper container={false}>
      <ProductsByCategorySection />
    </PageWrapper>
  );
};

ProductCategorySlugPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default ProductCategorySlugPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();
  const session = await getUserSessionSsr(context);

  const categoryId = getSlugFirstParam(context.params?.categoryId);

  await Promise.all([
    queryClient.prefetchQuery(categoryKeys.productsByCategoryId(categoryId), () => CategoryService.getProductsByCategoryId(categoryId)),
    queryClient.prefetchQuery(categoryKeys.categoryById(categoryId), () => CategoryService.getCategoryById(categoryId)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

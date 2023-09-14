import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { routes } from '@/config/routes';
import ProductSearchSection from '@/modules/products/sections/product-search-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { productKeys } from '@/shared/queries/product/product.query';
import { ProductService } from '@/shared/services/product/product.service';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const ProductSearchSlugPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="ProductSearchSlugPage us title"
        description="ProductSearchSlugPage description. this is something bla bla bla"
        path={routes.about}
      />
      <PageWrapper container={false} hasPadding={false}>
        <ProductSearchSection />
      </PageWrapper>
    </>
  );
};

ProductSearchSlugPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default ProductSearchSlugPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();
  const session = await getUserSessionSsr(context);
  const keyWord = context.params?.productSearchSlug as string;

  const page = Number(context.query.page) ?? DEFAULT_QUERY_PAGE;

  await queryClient.prefetchQuery(productKeys.searchProducts({ keyWord, page }), () => ProductService.searchProducts({ keyWord, page }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

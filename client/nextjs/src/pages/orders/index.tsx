import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import OrderListSection from '@/modules/orders/sections/order-list-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { orderKeys } from '@/shared/queries/order/order.query';
import { reviewKeys } from '@/shared/queries/reviews/review.query';
import { OrderService } from '@/shared/services/order/order.service';
import { ReviewService } from '@/shared/services/reviews/review.service';
import { authenticationSsr } from '@/shared/utils/auth/authentication-handler-ssr';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';
import { getAxiosConfigWithCookies } from '@/shared/utils/get-axios-config-with-cookies';

const OrdersPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Orders title" description="Orders description. this is something bla bla bla" path={routes.orders} />
      <PageWrapper>
        <Breadcrumb title="Orders" />
        <OrderListSection />
      </PageWrapper>
    </>
  );
};

OrdersPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default OrdersPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();
  const page = DEFAULT_QUERY_PAGE;

  const session = await getUserSessionSsr(context);
  await queryClient.prefetchQuery(orderKeys.orders({ page }), () =>
    OrderService.getOrders({ page, axiosConfig: getAxiosConfigWithCookies(context) }),
  );

  if (session.isAuthenticated) {
    await queryClient.prefetchQuery(reviewKeys.pendingReviewsAsCollection(), () => ReviewService.getPendingReviewsAsCollection());
  }

  return {
    ...authenticationSsr({
      context,
      isAuthenticated: session.isAuthenticated,
      redirectionFailPath: routes.login,
      requireAuthentication: true,
    }),
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

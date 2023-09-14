import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import WishlistProductSection from '@/modules/wishlist/sections/wishlist-product-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { wishlistKeys } from '@/shared/queries/wishlist/wishlist.query';
import { WishlistService } from '@/shared/services/wishlist/wishlist.service';
import { authenticationSsr } from '@/shared/utils/auth/authentication-handler-ssr';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';
import { getAxiosConfigWithCookies } from '@/shared/utils/get-axios-config-with-cookies';

const WishlistPage: NextPageWithLayout = () => {
  return (
    <PageWrapper>
      <Breadcrumb title="Wishlist" />
      <WishlistProductSection />
    </PageWrapper>
  );
};

WishlistPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default WishlistPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();
  const session = await getUserSessionSsr(context);

  if (session.isAuthenticated) {
    await queryClient.prefetchQuery(wishlistKeys.myWishlist({ page: DEFAULT_QUERY_PAGE, userId: session.loggedIn._id }), () =>
      WishlistService.getWishlist({ page: DEFAULT_QUERY_PAGE, axiosConfig: getAxiosConfigWithCookies(context) }),
    );
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

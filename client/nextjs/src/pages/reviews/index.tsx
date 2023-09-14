import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import PendingAndCompletedReviewsSection from '@/modules/reviews/pending-and-completed-reviews-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { reviewKeys } from '@/shared/queries/reviews/review.query';
import { ReviewService } from '@/shared/services/reviews/review.service';
import { authenticationSsr } from '@/shared/utils/auth/authentication-handler-ssr';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';
import { getAxiosConfigWithCookies } from '@/shared/utils/get-axios-config-with-cookies';

const ReviewsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="All Reviews" description="Pending Reviews Description" path={routes.reviews} />
      <PageWrapper>
        <Breadcrumb title="All Reviews" />
        <PendingAndCompletedReviewsSection />
      </PageWrapper>
    </>
  );
};

ReviewsPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();

  const completedPage = DEFAULT_QUERY_PAGE;
  const pendingPage = DEFAULT_QUERY_PAGE;

  const session = await getUserSessionSsr(context);

  if (session.isAuthenticated) {
    await queryClient.prefetchQuery(reviewKeys.pendingReviews({ page: pendingPage }), () =>
      ReviewService.getPendingReviews({ page: pendingPage, axiosConfig: getAxiosConfigWithCookies(context) }),
    );

    await queryClient.prefetchQuery(reviewKeys.completedReviews({ page: pendingPage }), () =>
      ReviewService.getCompletedReviews({ page: completedPage, axiosConfig: getAxiosConfigWithCookies(context) }),
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

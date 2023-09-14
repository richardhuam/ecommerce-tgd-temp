import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import AboutMeSection from '@/modules/profile/sections/about-me-section';
import ProfileBannerSection from '@/modules/profile/sections/profile-banner-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { authenticationSsr } from '@/shared/utils/auth/authentication-handler-ssr';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="My Profile" description="Profile description. this is something bla bla bla" path={routes.profile} />
      <PageWrapper>
        <Breadcrumb title="My Profile" />
        <ProfileBannerSection />
        <AboutMeSection />
      </PageWrapper>
    </>
  );
};

ProfilePage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();

  const session = await getUserSessionSsr(context);
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

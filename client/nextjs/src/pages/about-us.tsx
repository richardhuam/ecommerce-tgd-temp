import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { routes } from '@/config/routes';
import AboutBanner from '@/modules/about-us/components/about-banner';
import OurTeamSection from '@/modules/about-us/sections/our-team-section';
import OurStorySection from '@/modules/about-us/sections/out-story-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const AboutUsPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="About us title" description="About us description. this is something bla bla bla" path={routes.about} />
      <AboutBanner />
      <PageWrapper>
        <Breadcrumb title="About us" />
        <OurStorySection />
        <OurTeamSection />
      </PageWrapper>
    </>
  );
};

AboutUsPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default AboutUsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();
  const session = await getUserSessionSsr(context);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};

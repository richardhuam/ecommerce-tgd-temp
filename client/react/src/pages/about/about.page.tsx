import CompanyBanner from '@/features/about/components/company-banner';
import TeamMembers from '@/features/about/components/team-members';
import TeamStory from '@/features/about/components/team-story';
import Container from '@/features/layouts/container';
import Breadcrumb from '@/features/ui/breadcrumb';

type AboutPageProps = {};

export default function AboutPage({}: AboutPageProps) {
  return (
    <>
      <CompanyBanner />
      <Container className="section-spacer">
        <Breadcrumb title="About" />
        <TeamStory />
        <TeamMembers />
      </Container>
    </>
  );
}

import Tabs, { ITabsData } from '@/shared/components/ui/tabs';

import CompletedReviewsTab from './components/completed-reviews-tab';
import PendingReviewsTab from './components/pending-reviews-tab';

type PendingReviewsSectionProps = {};

export default function PendingAndCompletedReviewsSection({}: PendingReviewsSectionProps) {
  const tabData: ITabsData[] = [
    {
      label: 'Pending Reviews',
      content: <PendingReviewsTab />,
    },
    {
      label: `Completed Reviews`,
      content: <CompletedReviewsTab />,
    },
  ];

  return (
    <div>
      <Tabs tabData={tabData} />
    </div>
  );
}

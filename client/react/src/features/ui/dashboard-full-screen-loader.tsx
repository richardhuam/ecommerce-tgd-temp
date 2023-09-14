import { Spinner } from '@nextui-org/react';
import { DASHBOARD_CONTENT_HEIGHT } from '@/features/layouts/dashboard-layout/dashboard-layout-size.constant';

type DashboardFullScreenLoaderProps = {};

export default function DashboardFullScreenLoader({}: DashboardFullScreenLoaderProps) {
  return (
    <div
      className="flex items-center justify-center font-bold"
      style={{
        minHeight: DASHBOARD_CONTENT_HEIGHT,
      }}
    >
      <Spinner size="lg" />
    </div>
  );
}

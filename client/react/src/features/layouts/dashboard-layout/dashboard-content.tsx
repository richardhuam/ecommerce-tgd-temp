import { useAppSelector } from '@/hooks/use-redux-store';

import { BREAKPOINTS } from '@/config/breakpoints.config';
import {
  DASHBOARD_CONTENT_HEIGHT,
  DASHBOARD_NAVBAR_HEIGHT,
  DASHBOARD_SIDEBAR_WIDTH,
} from './dashboard-layout-size.constant';
import Container from '../container';

type DashboardContentProps = {
  children: React.ReactNode;
};

export default function DashboardContent({ children }: DashboardContentProps) {
  const { isSidebarOpen } = useAppSelector(store => store.sidebar);
  return (
    <main
      className="transition-all duration-[400ms] flex-grow mt-6"
      style={{
        paddingLeft: isSidebarOpen && innerWidth >= BREAKPOINTS.xl ? DASHBOARD_SIDEBAR_WIDTH : '0px',
        paddingTop: DASHBOARD_NAVBAR_HEIGHT,
        minHeight: DASHBOARD_CONTENT_HEIGHT,
      }}
    >
      <Container extended={!isSidebarOpen && innerWidth >= BREAKPOINTS.xl}>{children}</Container>
    </main>
  );
}

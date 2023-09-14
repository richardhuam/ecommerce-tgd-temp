import { useAppSelector } from '@/hooks/use-redux-store';
import { BREAKPOINTS } from '@/config/breakpoints.config';
import { DASHBOARD_FOOTER_HEIGHT, DASHBOARD_SIDEBAR_WIDTH } from '../dashboard-layout-size.constant';

type DashboardFooterProps = {};

export default function DashboardFooter({}: DashboardFooterProps) {
  const { isSidebarOpen } = useAppSelector(store => store.sidebar);
  return (
    <div
      className="w-full flex justify-between items-center transition-all duration-[400ms]"
      style={{
        height: DASHBOARD_FOOTER_HEIGHT,
        paddingLeft: isSidebarOpen && innerWidth >= BREAKPOINTS.xl ? DASHBOARD_SIDEBAR_WIDTH : '0px',
      }}
    >
      <p className="text-center mx-auto">© {new Date().getFullYear()} All rights reserved by Richard Huaman</p>
    </div>
  );
}

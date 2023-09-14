import { BREAKPOINTS } from '@/config/breakpoints.config';
import Drawer from '@/features/ui/drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { SidebarActions } from './dashboard-sidebar.slice';
import { UIConfig } from '@/config/ui.config';
import SidebarNavigation from './sidebar-navigation/sidebar-navigation';
import { DASHBOARD_LAYOUT_SIZES, DASHBOARD_NAVBAR_HEIGHT } from '../../dashboard-layout-size.constant';

type DashboardSidebarProps = {};

export default function DashboardSidebar({}: DashboardSidebarProps) {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(store => store.sidebar);

  const enableOverlay = isSidebarOpen && innerWidth <= BREAKPOINTS.xl;
  const enableBackdropOverlay = isSidebarOpen && innerWidth <= BREAKPOINTS.xl;

  return (
    <Drawer
      open={isSidebarOpen}
      direction="left"
      onClose={() => dispatch(SidebarActions.closeSidebar())}
      duration={400}
      size={DASHBOARD_LAYOUT_SIZES.width.sidebar}
      enableOverlay={enableOverlay}
      overlayOpacity={enableBackdropOverlay ? 0.3 : 0}
      zIndex={UIConfig().zIndex.sidebar}
      className="!shadow-sidebar !bg-white !overflow-y-auto"
      style={{
        paddingTop: DASHBOARD_NAVBAR_HEIGHT,
      }}
    >
      <SidebarNavigation />
    </Drawer>
  );
}

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { useWindowScreenSize } from '@/hooks/use-window-size';
import { useEffect } from 'react';
import { BREAKPOINTS } from '@/config/breakpoints.config';
import DashboardNavbar from './dashboard-navigation/dashboard-navbar/dashboard-navbar';
import DashboardContent from './dashboard-content';
import DashboardFooter from './dashboard-navigation/dashboard-footer';
import { SidebarActions } from './dashboard-navigation/dashboard-sidebar/dashboard-sidebar.slice';
import DashboardSidebar from './dashboard-navigation/dashboard-sidebar/dashboard-sidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch();
  const { screenSize } = useAppSelector(store => store.sidebar);
  useWindowScreenSize();

  useEffect(() => {
    if (screenSize && screenSize <= BREAKPOINTS.xl) {
      dispatch(SidebarActions.closeSidebar());
    } else {
      dispatch(SidebarActions.openSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  return (
    <div id="main-layout" className="flex flex-col min-h-screen">
      <DashboardNavbar />
      <DashboardSidebar />
      <DashboardContent>{children}</DashboardContent>
      <DashboardFooter />
    </div>
  );
}

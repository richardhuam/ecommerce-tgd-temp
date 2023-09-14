import Logo from '@/features/ui/logo';

import DashboardMenuButton from './dashboard-menu-button';
import { DASHBOARD_NAVBAR_HEIGHT } from '../../dashboard-layout-size.constant';
import NotificationsMenuDropdown from './notification-menu-dropdown';
import UserMenuDropDown from './user-menu-dropdown';
import { DASHBOARD_ROUTES } from '@/config/routes.config';

type DashboardNavbarProps = {};

export default function DashboardNavbar({}: DashboardNavbarProps) {
  return (
    <header
      className={`fixed w-full flex justify-between items-center transition-all duration-[400ms] bg-white shadow-navbar z-navbar`}
      style={{
        height: DASHBOARD_NAVBAR_HEIGHT,
      }}
    >
      <div className="w-full flex items-center justify-between px-4 md:px-8 lg:px-10">
        {/* Main Toggle Menu */}
        <div className="md:w-[45%]">
          <DashboardMenuButton />
        </div>
        {/* Logo */}
        <Logo url={DASHBOARD_ROUTES.OVERVIEW} size="sm" className="hidden md:flex" />
        {/* User Menu Options */}
        <div className="md:w-[45%] flex items-center justify-end">
          <NotificationsMenuDropdown />
          <UserMenuDropDown />
        </div>
      </div>
    </header>
  );
}

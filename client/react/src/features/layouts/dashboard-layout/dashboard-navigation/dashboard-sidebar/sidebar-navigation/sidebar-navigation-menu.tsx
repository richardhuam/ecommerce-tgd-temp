import { BREAKPOINTS } from '@/config/breakpoints.config';
import { useAppDispatch } from '@/hooks/use-redux-store';
import { useLocation } from 'react-router-dom';
import { SidebarActions } from '../dashboard-sidebar.slice';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { IDashboardNavbarLink } from './sidebar-navigation-links';

type SidebarNavigationMenuProps = {
  navLink: IDashboardNavbarLink;
  index: number;
  setSelectedMenu: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function SidebarNavigationMenu({ index, navLink, setSelectedMenu }: SidebarNavigationMenuProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isActivePath = location.pathname === navLink.path;

  function handleCloseSidebar() {
    if (innerWidth <= BREAKPOINTS.xl) {
      dispatch(SidebarActions.closeSidebar());
    }
    setSelectedMenu(index);
  }

  return (
    <Button
      as={Link}
      to={navLink.path}
      onClick={handleCloseSidebar}
      fullWidth
      radius="sm"
      className={`bg-white gap-4 justify-start h-[45px] ${
        isActivePath ? 'bg-primary text-white' : 'hover:bg-gray-100 text-[#000000DE]'
      }`}
      startContent={<navLink.icon strokeWidth={1.25} />}
    >
      <span>{navLink.title}</span>
    </Button>
  );
}

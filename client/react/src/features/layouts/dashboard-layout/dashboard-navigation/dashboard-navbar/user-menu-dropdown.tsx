import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from '@nextui-org/react';
import { BREAKPOINTS } from '@/config/breakpoints.config';
import { ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { AuthActions } from '@/features/auth/redux/auth.slice';
import { SidebarActions } from '../dashboard-sidebar/dashboard-sidebar.slice';

type UserMenuDropDownProps = {};

export default function UserMenuDropDown({}: UserMenuDropDownProps) {
  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(store => store.sidebar);
  const { me } = useAppSelector(store => store.user);
  const isScreenWidthGreaterThanXl = innerWidth <= BREAKPOINTS.xl;

  function handleDropDownTrigger() {
    if (isSidebarOpen && isScreenWidthGreaterThanXl) {
      dispatch(SidebarActions.closeSidebar());
    }
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger onClick={handleDropDownTrigger}>
        <Button disableRipple className="bg-transparent px-1 min-w-[48px] min-h-[48px]">
          <Avatar className="transition-transform mx-0" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <span className="ml-3 hidden sm:flex text-[16px]">Hi, {me.data?.firstName}</span>
          <ChevronDown className="ml-2 h-4 w-4 text-icon hidden sm:flex" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="user-menu">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{me.data?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="orders">Orders</DropdownItem>
        <DropdownItem key="reviews">Reviews</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => dispatch(AuthActions.logoutUser())}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

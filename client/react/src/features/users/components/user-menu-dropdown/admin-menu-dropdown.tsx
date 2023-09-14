import { AuthActions } from '@/features/auth/redux/auth.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { Button, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Avatar } from '@nextui-org/react';
import { ChevronDown } from 'lucide-react';
import UserMenuDropdownSkeleton from './user-menu-dropdown-skeleton';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTES } from '@/config/routes.config';

export default function AdminMenuDropDown() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: me, status } = useAppSelector(store => store.user.me);

  if (status === 'loading') {
    return <UserMenuDropdownSkeleton />;
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button disableRipple className="bg-transparent px-1 min-w-[48px] min-h-[48px]">
          <Avatar className="transition-transform mx-0" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <span className="ml-2 hidden md:flex text-[16px]">Hi, {me?.firstName}</span>
          <ChevronDown className="ml-2 h-4 w-4 text-icon hidden md:flex" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="user-menu">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{me?.email}</p>
        </DropdownItem>
        <DropdownItem onClick={() => navigate(DASHBOARD_ROUTES.OVERVIEW)} key="dashboard">
          Dashboard
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

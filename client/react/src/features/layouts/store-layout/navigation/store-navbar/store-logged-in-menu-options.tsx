import { ROLES } from '@/constants/roles.constant';
import AdminMenuDropDown from '@/features/users/components/user-menu-dropdown/admin-menu-dropdown';
import UserMenuDropDown from '@/features/users/components/user-menu-dropdown/user-menu-dropdown';
import { useAppSelector } from '@/hooks/use-redux-store';
import { NavbarItem } from '@nextui-org/react';

export default function LoggedInMenuOptions() {
  const { data: me } = useAppSelector(store => store.user.me);
  return (
    <>
      <NavbarItem>{me?.role === ROLES.ADMIN ? <AdminMenuDropDown /> : <UserMenuDropDown />}</NavbarItem>
    </>
  );
}

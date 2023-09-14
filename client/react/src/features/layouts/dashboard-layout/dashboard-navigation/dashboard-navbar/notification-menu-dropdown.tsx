import { BREAKPOINTS } from '@/config/breakpoints.config';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from '@nextui-org/react';
import { Bell } from 'lucide-react';
import { SidebarActions } from '../dashboard-sidebar/dashboard-sidebar.slice';

type NotificationsMenuDropdownProps = {};

export default function NotificationsMenuDropdown({}: NotificationsMenuDropdownProps) {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useAppSelector(store => store.sidebar);

  const isScreenWidthGreaterThanXl = innerWidth <= BREAKPOINTS.xl;

  function handleDropDownTrigger() {
    if (isSidebarOpen && isScreenWidthGreaterThanXl) {
      dispatch(SidebarActions.closeSidebar());
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button onClick={handleDropDownTrigger} isIconOnly className="bg-white mr-4">
          <Bell className="h-7 w-7 text-icon cursor-pointer" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="new"
          shortcut="⌘N"
          description="Create a new file"
          startContent={<Bell className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          description="Copy the file link"
          startContent={<Bell className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          description="Allows you to edit the file"
          startContent={<Bell className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          description="Permanently delete the file"
          startContent={<Bell className={cn(iconClasses, 'text-danger')} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

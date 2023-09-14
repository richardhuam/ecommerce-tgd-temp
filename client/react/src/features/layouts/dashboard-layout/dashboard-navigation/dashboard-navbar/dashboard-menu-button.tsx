import { useAppDispatch } from '@/hooks/use-redux-store';
import { Button } from '@nextui-org/react';
import { Menu } from 'lucide-react';
import { SidebarActions } from '../dashboard-sidebar/dashboard-sidebar.slice';

type DashboardMenuButtonProps = {};

export default function DashboardMenuButton({}: DashboardMenuButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <Button isIconOnly className="bg-white" onClick={() => dispatch(SidebarActions.toggleSidebar())}>
      <Menu className="h-7 w-7 text-icon cursor-pointer" />
    </Button>
  );
}

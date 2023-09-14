import { useEffect } from 'react';
import { useAppDispatch } from './use-redux-store';
import { SidebarActions } from '@/features/layouts/dashboard-layout/dashboard-navigation/dashboard-sidebar/dashboard-sidebar.slice';

export function useWindowScreenSize() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => dispatch(SidebarActions.setScreenSize(window.innerWidth));

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

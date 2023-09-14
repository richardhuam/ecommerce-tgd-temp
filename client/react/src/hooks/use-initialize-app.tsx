import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './use-redux-store';
import { UserThunk } from '@/features/users/redux/user.thunk';

export default function useInitializeApp() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(store => store.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(UserThunk.getMe());
    }
  }, [dispatch, isAuthenticated]);
}

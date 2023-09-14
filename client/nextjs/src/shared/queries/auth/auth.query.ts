import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { routes } from '@/config/routes';
import { useAuth } from '@/shared/contexts/auth.context';
import { useWishlist } from '@/shared/contexts/wishlist.context';
import { AuthService } from '@/shared/services/auth/auth.service';
import { IGetWishlistApiResponse } from '@/shared/services/wishlist/wishlist.service.types';

import { wishlistKeys } from '../wishlist/wishlist.query';

export const useLogin = () => {
  return useMutation(AuthService.login);
};

export const useSignUp = () => {
  return useMutation(AuthService.signup);
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { me, setIsAuthenticated, cleanUserData } = useAuth();

  const { page } = useWishlist();
  return useMutation(AuthService.logout, {
    onSuccess: data => {
      if (data.ok) {
        cleanUserData();
        setIsAuthenticated(false);
        router.pathname !== routes.home && router.push(routes.home);
        queryClient.setQueryData<IGetWishlistApiResponse>(wishlistKeys.myWishlist({ page, userId: me._id }), prevState => {
          if (prevState && prevState.ok) {
            return {
              ...prevState,
              data: {
                ...prevState.data,
                collection: [],
                result: [],
              },
            };
          }
          return prevState;
        });
        queryClient.invalidateQueries(wishlistKeys.myWishlist({ page, userId: me._id }));
      }
    },
  });
};

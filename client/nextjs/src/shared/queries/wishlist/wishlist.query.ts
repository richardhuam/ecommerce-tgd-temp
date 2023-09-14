import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/shared/contexts/auth.context';
import { IGetWishlistParams, IProduct } from '@/shared/models/product.model';
import { WishlistService } from '@/shared/services/wishlist/wishlist.service';
import { IGetWishlistApiResponse } from '@/shared/services/wishlist/wishlist.service.types';

import { IUseToggleWishlistQueryParams } from './wishlist.query.types';

type IMyWishlistKey = {
  userId: string;
  page: number;
};

export const wishlistKeys = {
  all: ['wishlist'] as const,
  myWishlist: ({ page, userId }: IMyWishlistKey) => [...wishlistKeys.all, { userId: userId || 'user-not-available' }, { page }],
};

export const useGetWishlist = ({ page }: IGetWishlistParams) => {
  const { me } = useAuth();
  const { isAuthenticated } = useAuth();
  return useQuery(wishlistKeys.myWishlist({ page, userId: me._id }), () => WishlistService.getWishlist({ page }), {
    keepPreviousData: true,
    enabled: isAuthenticated,
  });
};

export const useToggleWishlist = ({ page, selectedProduct }: IUseToggleWishlistQueryParams) => {
  const queryClient = useQueryClient();
  const { me } = useAuth();

  return useMutation((product: IProduct) => WishlistService.toggleWishlist(product._id), {
    onSuccess: data => {
      if (data.ok && selectedProduct) {
        if (data.data.status === 'added') {
          toast.success(`${selectedProduct.name} added to wishlist`);
          queryClient.setQueryData<IGetWishlistApiResponse>(wishlistKeys.myWishlist({ page, userId: me._id }), prevState => {
            if (prevState && prevState.ok) {
              return {
                ...prevState,
                data: {
                  ...prevState.data,
                  collection: prevState.data.collection.concat(selectedProduct._id),
                  result: prevState.data.result.concat(selectedProduct),
                },
              };
            }
            return prevState;
          });
        } else {
          toast.success(`${selectedProduct.name} removed from your wishlist`);
          queryClient.setQueryData<IGetWishlistApiResponse>(wishlistKeys.myWishlist({ page, userId: me._id }), prevState => {
            if (prevState && prevState.ok) {
              return {
                ...prevState,
                data: {
                  ...prevState.data,
                  collection: prevState.data.collection.filter(productId => productId !== selectedProduct._id),
                  result: prevState.data.result.filter(item => item._id !== selectedProduct._id),
                },
              };
            }
            return prevState;
          });
        }
      }
      queryClient.invalidateQueries(wishlistKeys.myWishlist({ page, userId: me._id }));
    },
    onError: () => {
      toast.error('Something went wrong, please try again later');
    },
  });
};

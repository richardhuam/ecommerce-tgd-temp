import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/shared/contexts/auth.context';
import { IUser } from '@/shared/models/account.model';
import { UserService } from '@/shared/services/user/user.service';
import { IUpdateUserByIdApiResponse } from '@/shared/services/user/user.service.types';

export const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

export const useGetMe = (isAuthenticated: boolean) => {
  return useQuery(userKeys.me(), () => UserService.getMe(), {
    enabled: isAuthenticated,
  });
};

export const useUpdateUserById = () => {
  const { setMe } = useAuth();
  const queryClient = useQueryClient();
  return useMutation((user: Partial<IUser>) => UserService.updateUserById(user), {
    onSuccess: data => {
      if (data.ok) {
        setMe(prevState => {
          return {
            ...prevState,
            ...data.data,
          };
        });
        queryClient.setQueryData<IUpdateUserByIdApiResponse>(userKeys.me(), prevState => {
          if (prevState && prevState.ok) {
            return {
              ...prevState,
              data: { ...prevState.data, ...data.data },
            };
          }
          return prevState;
        });
      }
      queryClient.invalidateQueries(userKeys.me());
    },
  });
};

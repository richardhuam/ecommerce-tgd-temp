import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

import { getQueryClient } from '@/shared/libs/get-query-client';

type QueryClientInstanceProviderProps = {
  children: React.ReactNode;
};

const QueryClientInstanceContext = createContext(
  {} as {
    queryClient: QueryClient | null;
  },
);

export function QueryClientInstanceProvider({ children }: QueryClientInstanceProviderProps) {
  const [queryClient] = useState(getQueryClient());

  return <QueryClientInstanceContext.Provider value={{ queryClient }}>{children}</QueryClientInstanceContext.Provider>;
}

export const useQueryClientInstance = (): { queryClient: QueryClient } => {
  const { queryClient } = useContext(QueryClientInstanceContext);

  if (!queryClient) {
    throw new Error('No QueryClientInstanceProvider Found');
  }

  return { queryClient };
};

import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

import { useQueryClientInstance } from '@/shared/contexts/query-client.context';

type AppQueryClientInstanceWrapperProps = {
  children: ReactNode;
};

export default function AppQueryClientInstanceWrapper({ children }: AppQueryClientInstanceWrapperProps) {
  const { queryClient } = useQueryClientInstance();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

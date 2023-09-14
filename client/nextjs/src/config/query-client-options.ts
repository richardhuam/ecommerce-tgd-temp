import { QueryClientConfig } from '@tanstack/react-query';

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 1000,
    },
  },
  /*  logger: {
    log: () => {},
    warn: () => {},
    error: () => {},
  }, */
};

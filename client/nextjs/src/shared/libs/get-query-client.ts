import { QueryClient } from '@tanstack/react-query';

import { queryClientOptions } from '@/config/query-client-options';

export const getQueryClient = () => new QueryClient(queryClientOptions); // Removed cache() function call

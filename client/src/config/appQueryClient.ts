import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const oneDay = 24 * 60 * 60 * 1000;

const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: oneDay,
      staleTime: oneDay,
      retry: false,
      retryOnMount: true,
    },
  },
});

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

export default appQueryClient;

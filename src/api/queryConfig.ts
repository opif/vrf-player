import { QueryClient, QueryFunction } from '@tanstack/react-query';

import { buildUrl } from 'common/utils';

import type { ApiUrl } from './urls';
import { URLPathParams } from './types';

export type QueryKey = [ApiUrl, URLPathParams?, URLSearchParams?];

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  if (!isQueryKey(queryKey)) {
    console.error('incorrect queryKey', { queryKey });

    return;
  }

  const [endpoint, params, query] = queryKey;

  const url = buildUrl(endpoint, params, query);
  const data = await fetch(url).then((response) => response.json());

  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
    },
  },
});

const isQueryKey = (queryKey: unknown): queryKey is QueryKey => {
  return Array.isArray(queryKey) && queryKey.length >= 1;
};

export default queryClient;

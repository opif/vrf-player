import { QueryClient, QueryFunction } from '@tanstack/react-query';

import { composeUrl } from 'common/utils';

import type { ApiUrl } from './urls';
import { URLParams } from './types';

export type QueryKey = [ApiUrl, URLParams];

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  if (!isQueryKey(queryKey)) {
    console.error('incorrect queryKey', { queryKey });

    return;
  }

  const [endpoint, params] = queryKey;

  const url = composeUrl(endpoint, params);
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
  return Array.isArray(queryKey) && queryKey.length >= 2;
};

export default queryClient;

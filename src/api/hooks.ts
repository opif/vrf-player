import { useQuery } from '@tanstack/react-query';

import { QueryKey } from './queryConfig';
import { ListResult } from './types';

type MyQueryKey = string | QueryKey;

// O extends UseQueryOptions = UseQueryOptions

const useListQuery = <T, O = unknown>(queryKey: MyQueryKey, options?: O) =>
  useBaseQuery<ListResult<T>>(queryKey, options);

const useDataQuery = <T, O = unknown>(queryKey: MyQueryKey, options?: O) => {
  const [, params] = queryKey;
  const { id } = params;

  return useBaseQuery<T>(queryKey, { enabled: !!id, ...options });
};

const useBaseQuery = <T, O = unknown>(queryKey: MyQueryKey, options?: O) =>
  useQuery<T>({ ...options, queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });

export { useListQuery, useDataQuery, useBaseQuery };

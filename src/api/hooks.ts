import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKey } from './queryConfig';
import { ListResult, ServerError, ServerId } from './types';

interface ListQueryOptions<T, E> extends UseQueryOptions<T, E> {}

const useListQuery = <T, E = ServerError, D = ListResult<T>>(
  queryKey: QueryKey,
  options?: ListQueryOptions<D, E>,
) => useQuery<D, E>({ ...options, queryKey });

interface DataQueryOptions<T, E> extends UseQueryOptions<T, E> {
  id?: ServerId;
}

const useDataQuery = <T, E = ServerError>(options: DataQueryOptions<T, E>) => {
  return useQuery<T, E>({ enabled: !!options?.id, ...options });
};

export { useListQuery, useDataQuery };

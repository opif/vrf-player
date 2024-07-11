import { URLParams } from 'api/types';

import { parseRoute } from './parseRoute';
import { fillRoute } from './fillRoute';

export const resolveUrl = <TParams extends URLParams>(
  path: string,
  params: TParams,
): string => {
  const route = parseRoute(path);
  const url = fillRoute(route, params);

  return url || '';
};

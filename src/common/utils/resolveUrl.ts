import { URLPathParams } from 'api/types';

import { parseRoute } from './parseRoute';
import { fillRoute } from './fillRoute';

export const resolveUrl = (path: string, params?: URLPathParams): string => {
  const route = parseRoute(path);
  const url = fillRoute(route, params);

  return url ?? '';
};

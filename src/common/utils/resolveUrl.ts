import { URLParams } from 'api/types';

import { parseRoute } from './parseRoute';
import { fillRoute } from './fillRoute';

export const resolveUrl = (path: string, params?: URLParams): string => {
  const route = parseRoute(path);
  const url = fillRoute(route, params);

  return url ?? '';
};

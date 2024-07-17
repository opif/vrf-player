import { URLParams } from 'api/types';

import { resolveUrl } from './resolveUrl';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const composeUrl = (path: string, params?: URLParams): string => {
  const url = baseUrl + resolveUrl(path, params);

  return url;
};

import { URLPathParams } from 'api/types';

import { resolveUrl } from './resolveUrl';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const buildUrl = (
  path: string,
  params?: URLPathParams,
  query?: URLSearchParams,
): string => {
  const url = new URL(resolveUrl(path, params), baseUrl);
  url.search = query?.toString() ?? '';

  return url.toString();
};

import { expect, test } from 'vitest';
import { fillRoute } from './fillRoute';
import { parseRoute } from './parseRoute';

test.each([
  ['/recordings/:recordingId', { recordingId: 123 }, '/recordings/123'],
  ['/recordings/:recordingId', { recordingId: 'rec-new' }, '/recordings/rec-new'],
  [
    '/cms/list/:listId/item/:itemId/',
    { listId: 'li', itemId: '4' },
    '/cms/list/li/item/4/',
  ],
])('substitute parameters for routes', (path, params, expected) => {
  const route = parseRoute(path);

  expect(fillRoute(route, params)).toEqual(expected);
});

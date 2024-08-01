import { expect, test } from 'vitest';
import { buildUrl } from './buildUrl';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

test.each([
  ['/hello/:id', { id: 42 }, `${baseUrl}/hello/42`],
  ['hello/:id', { id: 42 }, `${baseUrl}/hello/42`],
  [
    '/hello/:id/good/:function',
    { id: 13, function: 'bye' },
    `${baseUrl}/hello/13/good/bye`,
  ],
])('substitute parameters for routes', (path, params, expected) => {
  const url = buildUrl(path, params);

  expect(url).toEqual(expected);
});

test.each([
  [
    '/list',
    new URLSearchParams('?q=queryString&fun=123'),
    `${baseUrl}/list?q=queryString&fun=123`,
  ],
  [
    '/hello/there',
    new URLSearchParams('filter=some+thing&acc=42'),
    `${baseUrl}/hello/there?filter=some+thing&acc=42`,
  ],
])('add query param to base', (path, query, expected) => {
  const url = buildUrl(path, {}, query);

  expect(url).toEqual(expected);
});

test.each([
  [
    '/hello/:id',
    { id: 77 },
    new URLSearchParams('?q=query+string'),
    `${baseUrl}/hello/77?q=query+string`,
  ],
  [
    '/hello/:id/good/:function',
    { id: 112, function: 'bye' },
    new URLSearchParams('filter=some+thing&acc=42'),
    `${baseUrl}/hello/112/good/bye?filter=some+thing&acc=42`,
  ],
])('substitute parameters and add query', (path, params, query, expected) => {
  const url = buildUrl(path, params, query);

  expect(url).toEqual(expected);
});

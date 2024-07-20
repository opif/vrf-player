import { expect, test } from 'vitest';
import { formatSize } from './formatSize';

test.each([
  [102, '102 B'],
  [11470, '11.2 KiB'],
  [67633152, '64.5 MiB'],
  [2254857830, '2.10 GiB'],
])('format timestamp as string', (size: number, expected: string) => {
  expect(formatSize(size)).toBe(expected);
});

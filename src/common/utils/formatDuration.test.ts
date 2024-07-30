import { expect, test } from 'vitest';
import { formatDuration } from './formatDuration';

test.each([
  [30_000, '00:30'],
  [140_000, '02:20'],
  [3_750_000, '01:02:30'],
])('format duration as string', (duration: number, expected: string) => {
  expect(formatDuration(duration)).toBe(expected);
});

test.each([
  [10_000 / 3, '00:03'],
  [(2 * 60 + 41) * 1000 + 181, '02:41'],
])('remove subseconds by default', (duration: number, expected: string) => {
  expect(formatDuration(duration)).toBe(expected);
});

test.each([
  [10_000 / 3, '00:04'],
  [(2 * 60 + 41) * 1000 + 181, '02:42'],
])(
  'properly round up subseconds for special cases',
  (duration: number, expected: string) => {
    expect(formatDuration(duration, true)).toBe(expected);
  },
);

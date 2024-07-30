import { expect, test } from 'vitest';
import { formatDuration } from './formatDuration';

test.each([
  [30, '00:30'],
  [140, '02:20'],
  [3750, '01:02:30'],
])('format duration as string', (duration: number, expected: string) => {
  expect(formatDuration(duration)).toBe(expected);
});

test.each([
  [10 / 3, '00:03'],
  [((2 * 60 + 41) * 1000 + 181) / 1000, '02:41'],
])('properly round subseconds', (duration: number, expected: string) => {
  expect(formatDuration(duration)).toBe(expected);
});

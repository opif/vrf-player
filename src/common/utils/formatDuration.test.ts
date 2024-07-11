import { expect, test } from 'vitest';
import { formatDuration } from './formatDuration';

test.each([
  [30, '00:30'],
  [140, '02:20'],
  [3750, '01:02:30'],
])('format duration as string', (duration: number, expected: string) => {
  expect(formatDuration(duration)).toBe(expected);
});

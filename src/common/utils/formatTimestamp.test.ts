import { expect, test } from 'vitest';
import { ServerTimestamp } from 'api/types';
import { formatTimestamp } from './formatTimestamp';

test.each([['2008-11-06T21:22:22.000Z' as ServerTimestamp, '2008-11-06 21:22:22']])(
  'format timestamp as string',
  (ts: ServerTimestamp, expected: string) => {
    expect(formatTimestamp(ts)).toBe(expected);
  },
);

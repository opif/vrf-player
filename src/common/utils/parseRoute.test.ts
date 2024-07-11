import { expect, test } from 'vitest';
import { parseRoute } from './parseRoute';

test('simple parse', () => {
  expect(parseRoute('/recordings/:recordingId/')).toEqual([
    '',
    'recordings',
    ':recordingId',
    '',
  ]);
});

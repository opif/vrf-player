import dayjs from 'dayjs';
import { ServerTimestamp } from 'api/types';

const formatTimestamp = (ts: ServerTimestamp): string =>
  dayjs(ts.replace('Z', '')).format('YYYY-MM-DD HH:mm:ss');

export { formatTimestamp };

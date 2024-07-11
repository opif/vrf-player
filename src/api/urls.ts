import { Flatten } from 'common/utils';

const apiUrls = {
  RECORDINGS: {
    LIST: '/recordings',
    DETAILS: '/recordings/:id',
  },
} as const;

export type ApiUrl = Flatten<typeof apiUrls>;

export default apiUrls;

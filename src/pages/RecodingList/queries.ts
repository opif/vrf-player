import { useListQuery } from 'api/hooks';
import { Recording } from 'api/types';

import apiUrls from 'api/urls';

export const useRecordingsQuery = () => {
  return useListQuery<Recording>([apiUrls.RECORDINGS.LIST]);
};

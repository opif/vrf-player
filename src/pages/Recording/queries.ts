import { useDataQuery } from 'api/hooks';
import { Recording, ServerId } from 'api/types';

import apiUrls from 'api/urls';

export const useRecordingQuery = (id: ServerId) => {
  return useDataQuery<Recording>({ queryKey: [apiUrls.RECORDINGS.DETAILS, { id }], id });
};

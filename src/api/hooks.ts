import { useQuery } from '@tanstack/react-query';
import apiUrls from './urls';

const useRecordingsQuery = () => {
  return useQuery({ queryKey: [apiUrls.RECORDINGS.LIST, {}] });
};

export { useRecordingsQuery };

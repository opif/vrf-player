const baseUrl = import.meta.env.VITE_FILE_BASE_URL;

export const getVrfPath = (recordingHash: string): string => {
  if (!baseUrl) {
    console.error('FILE_BASE_URL is unset, invalid configuration');
  }

  const url = baseUrl + '/' + recordingHash;

  return url;
};

const formatSegment = (n: number): string => (n < 10 ? `0${n}` : n.toString());

const formatDuration = (duration: number, round = false): string => {
  duration = round ? Math.ceil(duration / 1000) : Math.floor(duration / 1000);

  const seconds = duration % 60;
  duration = Math.floor(duration / 60);
  const minutes = duration % 60;
  duration = Math.floor(duration / 60);
  const hours = duration;

  return hours > 0
    ? `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`
    : `${formatSegment(minutes)}:${formatSegment(seconds)}`;
};

export { formatDuration };

const formatSegment = (n: number): string => (n < 10 ? `0${n}` : n.toString());

const formatDuration = (duration: number): string => {
  duration = Math.ceil(duration);

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

const steps = [
  ['B', 0],
  ['KiB', 1],
  ['MiB', 1],
] as const;

const formatSize = (size: number): string => {
  for (const [step, digits] of steps) {
    if (size < 1024) {
      return size.toFixed(digits) + ' ' + step;
    }

    size /= 1024;
  }

  return size.toFixed(2) + ' GiB';
};

export { formatSize };

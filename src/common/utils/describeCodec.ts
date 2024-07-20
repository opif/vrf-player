const describeCodec = (codec: number, codecformat: number): string => {
  switch (codec) {
    case 0: {
      const C = 'GSM 6.10';

      switch (codecformat) {
        case 0:
          return `${C} 8kHz`;
        case 1:
          return `${C} 11kHz`;
        case 2:
          return `${C} 22kHz`;
        case 3:
          return `${C} 44kHz`;
        default:
          return 'Unknown codec';
      }
    }
    case 1:
    // eslint-disable-next-line no-fallthrough
    case 2:
      return 'Opus 48kHz';
    case 3: {
      const F = 8 * 2 ** Math.floor(codecformat / 11);
      const Q = codecformat % 11;

      return `Speex ${F}kHz Quality ${Q}`;
    }
    default:
      return 'Unknown codec';
  }
};

export { describeCodec };

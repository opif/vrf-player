const theme = {
  font: {
    size: {
      regular: '20px',
      small: '16px',
    },
    color: {
      lightHeader: '#aebda4',
      darkBase: '#323232',
    },
  },
  color: {
    tileBackground: '#f5f5f5',
  },
} as const;

export type Theme = typeof theme;

export { theme };

const theme = {
  font: {
    size: {
      regular: '20px',
      small: '16px',
    },
    color: '#323232',
  },
} as const;

export type Theme = typeof theme;

export { theme };

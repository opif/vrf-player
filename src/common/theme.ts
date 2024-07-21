const theme = {
  font: {
    color: '#323232',
  },
} as const;

export type Theme = typeof theme;

export { theme };

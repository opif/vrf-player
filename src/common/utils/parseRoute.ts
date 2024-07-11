export type ParsedRoute = string[];

const parseRoute = (path: string): ParsedRoute => {
  return path.split('/');
};

export { parseRoute };

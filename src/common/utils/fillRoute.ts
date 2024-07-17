import { URLParams } from 'api/types';
import { ParsedRoute } from './parseRoute';

const getParameter = (segment: string) =>
  segment[0] === ':' ? segment.substring(1) : null;

const fillRoute = (route: ParsedRoute, params?: URLParams): string | undefined => {
  const replacedRoute = route.map((segment) => {
    const paramName = getParameter(segment);

    if (params && paramName && paramName in params) {
      return params[paramName];
    } else {
      return segment;
    }
  });

  return replacedRoute.join('/');
};

export { fillRoute };

import React from 'react';
import styled from 'styled-components';

export interface SvgProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

const _Svg = ({ size, ...props }: SvgProps) => {
  const dimensions = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
      }
    : null;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="hotpink" {...dimensions} {...props} />
  );
};

const Svg = styled(_Svg)`
  display: inline;
  color: ${({ theme }) => theme.font.color};
`;

export { Svg };

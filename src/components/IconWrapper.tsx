import styled from 'styled-components';

const IconWrapper = styled.div<{ $size: number }>`
  flex-shrink: 0;

  ${({ $size }) => ({
    width: `${$size}px`,
    height: `${$size}px`,
  })}
`;

export { IconWrapper };

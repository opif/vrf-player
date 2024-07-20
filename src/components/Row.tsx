import styled from 'styled-components';

interface Props {
  $spread?: boolean;
  $margin?: string;
}

const Row = styled.div<Props>`
  display: flex;
`;

export { Row };

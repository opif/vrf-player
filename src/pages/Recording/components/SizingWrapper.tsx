import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

interface Dimensions {
  width: number;
  height: number;
}

interface Props {
  children: (dimensions: Dimensions) => React.ReactNode;
}

const SizingWrapper = (props: Props) => {
  const [dimensions, setDimensions] = useState<Dimensions>();
  const observerRef = useRef<ResizeObserver>();

  const sizingRef = useCallback((node: HTMLDivElement) => {
    if (node == null) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    } else {
      observerRef.current = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.contentRect) {
            const { width, height } = entry.contentRect;

            setDimensions({ width, height });
          }
        });
      });

      observerRef.current.observe(node);
    }
  }, []);

  return (
    <StyledDiv ref={sizingRef}>{!!dimensions && props.children(dimensions)}</StyledDiv>
  );
};

const StyledDiv = styled.div`
  flex: 1;
  min-height: 100px;
  position: relative;
`;

export { SizingWrapper };

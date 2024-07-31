import { useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';

import { Segment } from 'api/types';
import { formatDuration } from 'common/utils';
import { SpeakerTwoIcon, SpeakerIcon } from 'assets/icons';
import { IconWrapper } from 'components/IconWrapper';

interface SpeakerListProps {
  segments: Segment[];
  activeSet?: Set<number>;
}

const SpeakerList = ({ segments, activeSet }: SpeakerListProps) => {
  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    const firstActiveSegment = Math.min(...Array.from(activeSet ?? []));

    if (Number.isFinite(firstActiveSegment)) {
      listRef.current?.scrollToItem(firstActiveSegment, 'center');
    }
  }, [activeSet]);

  return (
    <SizingWrapper>
      {(height) => (
        <FixedSizeList
          ref={listRef}
          height={height}
          width="100%"
          style={{
            position: 'absolute',
          }}
          outerElementType={StyledOuter}
          itemSize={LIST_ITEM_HEIGHT}
          itemCount={segments.length}
          itemData={{ segments, activeSet }}
        >
          {SpeakerListItem}
        </FixedSizeList>
      )}
    </SizingWrapper>
  );
};

interface Props {
  children: (height: number) => React.ReactNode;
}

const SizingWrapper = (props: Props) => {
  const [height, setHeight] = useState<number | null>(null);
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
            setHeight(entry.contentRect.height);
          }
        });
      });

      observerRef.current.observe(node);
    }
  }, []);

  return (
    <StyledDiv ref={sizingRef}>{height != null && props.children(height)}</StyledDiv>
  );
};

const StyledDiv = styled.div`
  flex: 1;
  min-height: 100px;
  position: relative;
`;

const StyledOuter = styled.div`
  top: 0;
  left: 0;
  position: absolute;
`;

interface ListData {
  segments: Segment[];
  activeSet?: Set<number>;
}

const SpeakerListItem = ({ style, data, index }: ListChildComponentProps<ListData>) => {
  const activeSet = data.activeSet;
  const segment = data.segments[index];
  const isActive = activeSet?.has(segment.segmentOrder) || false;

  return (
    <ListItem style={style} $current={isActive}>
      <IconWrapper $size={32}>
        {isActive ? <SpeakerTwoIcon size={32} /> : <SpeakerIcon size={32} />}
      </IconWrapper>
      <span>{formatDuration(segment.time)}</span>
      <ItemUsername>{segment.username}</ItemUsername>
      <ItemDuration>[{formatDuration(segment.duration, true)}]</ItemDuration>
    </ListItem>
  );
};

const LIST_ITEM_HEIGHT = 36;

const ListItem = styled.div<{ $current: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 2px;
  height: ${LIST_ITEM_HEIGHT}px;

  ${({ $current }) =>
    $current && {
      color: 'green',
    }}

  @media (min-width: 600px) {
    padding: 0 1rem;
  }
`;

const ItemUsername = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ItemDuration = styled.span`
  display: none;
  margin-left: auto;
  font-style: italic;
  font-size: ${({ theme }) => theme.font.size.small};

  @media (min-width: 380px) {
    display: inline;
  }
`;

export { SpeakerList };

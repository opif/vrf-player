import { useEffect, useRef } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import styled from 'styled-components';

import { Segment } from 'api/types';
import { formatDuration } from 'common/utils';
import { SpeakerTwoIcon, SpeakerIcon } from 'assets/icons';

interface SegmentListProps {
  segments: Segment[];
  activeSet?: Set<number>;
}

const SegmentList = ({ segments, activeSet }: SegmentListProps) => {
  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    const firstActiveSegment = Math.min(...Array.from(activeSet ?? []));

    if (Number.isFinite(firstActiveSegment)) {
      listRef.current?.scrollToItem(firstActiveSegment, 'center');
    }
  }, [activeSet]);

  return (
    <FixedSizeList
      ref={listRef}
      height={600}
      width="100%"
      outerElementType="ul"
      itemSize={LIST_ITEM_HEIGHT}
      itemCount={segments.length}
      itemData={{ segments, activeSet }}
    >
      {SegmentListItem}
    </FixedSizeList>
  );
};

interface ListData {
  segments: Segment[];
  activeSet?: Set<number>;
}

const SegmentListItem = ({ style, data, index }: ListChildComponentProps<ListData>) => {
  const activeSet = data.activeSet;
  const segment = data.segments[index];
  const isActive = activeSet?.has(segment.segmentOrder) || false;

  return (
    <ListItem style={style} $current={isActive}>
      {isActive ? <SpeakerTwoIcon size={32} /> : <SpeakerIcon size={32} />}
      {formatDuration(segment.time / 1000)} {segment.username}
      <ItemTimestamp>[{formatDuration(segment.duration / 1000)}]</ItemTimestamp>
    </ListItem>
  );
};

const LIST_ITEM_HEIGHT = 36;

const ListItem = styled.li<{ $current: boolean }>`
  display: flex;
  gap: 1em;
  align-items: center;
  padding: 2px;
  height: ${LIST_ITEM_HEIGHT}px;

  ${({ $current }) =>
    $current && {
      color: 'green',
    }}
`;

const ItemTimestamp = styled.span`
  margin-left: auto;
`;

export { SegmentList };

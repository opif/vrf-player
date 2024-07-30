import { useEffect, useRef } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
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
    <FixedSizeList
      ref={listRef}
      height={600}
      width="100%"
      outerElementType="ul"
      itemSize={LIST_ITEM_HEIGHT}
      itemCount={segments.length}
      itemData={{ segments, activeSet }}
    >
      {SpeakerListItem}
    </FixedSizeList>
  );
};

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

const ListItem = styled.li<{ $current: boolean }>`
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

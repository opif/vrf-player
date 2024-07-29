import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { Segment } from 'api/types';
import { formatDuration } from 'common/utils';
import { SpeakerFullIcon, SpeakerIcon } from 'assets/icons';

interface SegmentListProps {
  segments: Segment[];
  activeSet?: Set<number>;
}

const SegmentList = ({ segments, activeSet }: SegmentListProps) => {
  const firstSegmentOrder = useMemo(
    () => Math.min(...Array.from(activeSet ?? [])),
    [activeSet],
  );

  return (
    <List>
      {segments.map((segment) => (
        <SegmentListItem
          key={segment.id}
          segment={segment}
          isActive={!!activeSet?.has(segment.segmentOrder)}
          isFirst={segment.segmentOrder === firstSegmentOrder}
        />
      ))}
    </List>
  );
};

interface SegmentProps {
  segment: Segment;
  isActive: boolean;
  isFirst?: boolean;
}

const SegmentListItem = ({ segment, isActive, isFirst }: SegmentProps) => {
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isFirst) {
      liRef.current?.scrollIntoView();
    }
  }, [isFirst]);

  return (
    <ListItem ref={liRef} $current={isActive}>
      {isActive ? <SpeakerFullIcon size={32} /> : <SpeakerIcon size={32} />}
      {formatDuration(segment.duration / 1000)} {segment.username}
    </ListItem>
  );
};

const List = styled.ul`
  height: 600px;
  overflow: scroll;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li<{ $current: boolean }>`
  display: flex;
  gap: 1em;
  align-items: center;
  padding: 2px;

  ${({ $current }) =>
    $current && {
      color: 'green',
    }}
`;

export { SegmentList };

import styled from 'styled-components';

import { Segment } from 'api/types';
import { formatDuration } from 'common/utils';
import { SpeakerFullIcon, SpeakerIcon } from 'assets/icons';
import { useEffect } from 'react';

interface Props {
  segments: Segment[];
  active?: Set<number>;
}

const SegmentList = ({ segments, active }: Props) => {
  // useEffect(() => {
  //   document.getElementById(`segment_${currentIndex}`)?.scrollIntoView();
  // }, [currentIndex]);

  return (
    <List>
      {segments.map((segment) => (
        <ListItem
          key={segment.segmentOrder}
          id={`segment_${segment.segmentOrder}`}
          $current={active?.has(segment.segmentOrder) ?? false}
        >
          {active?.has(segment.segmentOrder) ? (
            <SpeakerFullIcon size={32} />
          ) : (
            <SpeakerIcon size={32} />
          )}
          {formatDuration(segment.duration / 1000)} {segment.username}
        </ListItem>
      ))}
    </List>
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

export default SegmentList;

import styled from 'styled-components';
import { describeCodec, formatDuration, formatSize } from 'common/utils';
import { Recording } from 'api/types';

import { Pill } from './Pill';
import { Time } from './Time';

interface Props extends Recording {
  description?: string;
}

const RecordingTile = ({
  filename,
  recDate,
  recUsername,
  duration,
  speakerCount,
  size,
  codec,
  codecformat,
  comment,
  copyright,
  version,
  url,
}: Props) => (
  <Tile>
    <Row>
      <FWrapper>FN: {filename}</FWrapper>
      {recDate && <TimeWrapper dateTime={recDate} />}
    </Row>
    <span>Recorded by: {recUsername}</span>
    {size != null && <span>Size: {formatSize(size)}</span>}
    {comment && <span>Comment: {comment}</span>}
    {copyright && <span>Copyright: {copyright}</span>}
    {url && <span>{url}</span>}
    <Row>
      {duration != null && <span>Duration: {formatDuration(duration / 1000)}</span>}
      <span>Speakers: {speakerCount}</span>
    </Row>
    <PillRow>
      {version && <Pill>VT {version}</Pill>}
      <Pill>{describeCodec(+codec, +codecformat)}</Pill>
    </PillRow>
  </Tile>
);

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 10px 10px 24px -5px rgba(66, 68, 90, 1);
  transition: transform 200ms, box-shadow 200ms;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 15px 15px 24px -5px rgba(66, 68, 90, 1);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FWrapper = styled.span`
  word-break: break-all;
`

const TimeWrapper = styled(Time)`
  margin-left: auto;
`

const PillRow = styled.div`
  display: flex;
  gap: 0.5em;
  margin-top: auto;
`;

export default RecordingTile;

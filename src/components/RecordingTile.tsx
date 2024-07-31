import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Recording } from 'api/types';
import { formatDuration, formatSize } from 'common/utils';

import { Pill } from './Pill';
import { Time } from './Time';

interface Props extends Recording {
  description?: string;
}

const RecordingTile = ({
  id,
  filename,
  recordedAt,
  recordedBy,
  duration,
  speakerCount,
  size,
  codecDescription,
  version,
}: Props) => {
  return (
    <Link to={`/${id}`}>
      <Tile>
        <Row>
          <StyledFilename>{filename}</StyledFilename>
          {recordedAt && <StyledTime dateTime={recordedAt} />}
        </Row>
        <span>By: {recordedBy}</span>
        {size != null && <span>Size: {formatSize(size)}</span>}
        <Row>
          {duration != null && <span>Duration: {formatDuration(duration, true)}</span>}
          <span>Speakers: {speakerCount}</span>
        </Row>
        <PillRow>
          {version && <Pill>VT {version}</Pill>}
          <Pill>{codecDescription}</Pill>
        </PillRow>
      </Tile>
    </Link>
  );
};

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 10px 10px 24px -5px rgba(66, 68, 90, 1);
  transition:
    transform 200ms,
    box-shadow 200ms;

  color: ${({ theme }) => theme.font.color.darkBase};
  background-color: ${({ theme }) => theme.color.tileBackground};

  &:hover {
    transform: translate(-5px, -5px);
    box-shadow: 15px 15px 24px -5px rgba(66, 68, 90, 1);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFilename = styled.span`
  word-break: break-all;
`;

const StyledTime = styled(Time)`
  margin-left: auto;
`;

const PillRow = styled.div`
  display: flex;
  gap: 0.5em;
  margin-top: auto;
`;

export default RecordingTile;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Recording } from 'api/types';
import { DownloadIcon } from 'assets/icons';
import { describeCodec, formatDuration, formatSize } from 'common/utils';

import { Pill } from './Pill';
import { Time } from './Time';

interface Props extends Recording {
  description?: string;
}

const RecordingTile = ({
  id,
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
}: Props) => {
  return (
    <Link to={`/${id}`}>
      <Tile>
        <Row>
          <FWrapper>{filename}</FWrapper>
          {recDate && <TimeWrapper dateTime={recDate} />}
        </Row>
        <span>By: {recUsername}</span>
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
        <PillRow>
          <Pill>
            <DownloadIcon size={16} />
            MP3
          </Pill>
          <Pill>
            <DownloadIcon size={16} />
            VRF
          </Pill>
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
  background-color: #f5f5f5;
  box-shadow: 10px 10px 24px -5px rgba(66, 68, 90, 1);
  transition:
    transform 200ms,
    box-shadow 200ms;

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
`;

const TimeWrapper = styled(Time)`
  margin-left: auto;
`;

const PillRow = styled.div`
  display: flex;
  gap: 0.5em;
  margin-top: auto;
`;

export default RecordingTile;

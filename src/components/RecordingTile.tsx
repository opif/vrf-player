import styled from 'styled-components';
import { formatDuration } from 'common/utils';

import { Recording } from 'api/types';

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
  platform,
  version,
  url,
}: Props) => (
  <Tile>
    <span>
      {filename} {id}
    </span>
    <span>{recDate}</span>
    <span>{recUsername}</span>
    <span>
      {codec} {codecformat}
    </span>
    {size != null && <span>Size: {size}</span>}
    {comment && <span>Comment: {comment}</span>}
    {copyright && <span>Copyright: {copyright}</span>}
    {platform && <span>Platform: {platform}</span>}
    {version && <span>Version: {version}</span>}
    {url && <span>{url}</span>}
    {duration != null && <span>Duration: {formatDuration(duration / 1000)}</span>}
    <span>Speakers: {speakerCount}</span>
  </Tile>
);

const Tile = styled.div`
  width: 100%;
  margin: 2em;
  padding: 1em;
  border: 1px solid green;
  display: flex;
  flex-direction: column;
`;

export default RecordingTile;

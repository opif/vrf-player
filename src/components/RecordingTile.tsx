import { formatDuration } from 'common/utils';
import styled from 'styled-components';

interface Props {
  id: number;
  name: string;
  date: string;
  description?: string;
  duration: number;
  speakers: string[];
}

const RecordingTile = ({ id, name, date, description, duration, speakers }: Props) => (
  <Tile>
    <span>
      {name} {id}
    </span>
    <span>{date}</span>
    <span>Duration: {formatDuration(duration)}</span>
    <p>{description}</p>
    <span>Speakers: {speakers.length}</span>
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

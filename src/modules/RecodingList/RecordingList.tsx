import styled from 'styled-components';

import RecordingTile from 'components/RecordingTile';

import { useRecordingsQuery } from './queries';

const RecordingList = () => {
  const { isPending, isError, data } = useRecordingsQuery();
  console.log({ data });
  const recordings = data?.list || [];

  return (
    <Column>
      <Row>
        {isPending && <h2>Loading...</h2>}
        {isError && <h2>There was an error while loading the recording list</h2>}
        {recordings.map((recording) => (
          <RecordingTile key={recording.id} {...recording} />
        ))}
      </Row>
    </Column>
  );
};

const Column = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
`;

export default RecordingList;

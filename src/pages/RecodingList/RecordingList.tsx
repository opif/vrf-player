import styled from 'styled-components';

import RecordingTile from 'components/RecordingTile';

import { useRecordingsQuery } from './queries';

const RecordingList = () => {
  const { isPending, isError, data } = useRecordingsQuery();
  console.log({ data });
  const recordings = data?.values || [];

  return (
    <Column>
      {(isPending || isError) && (
        <Header>
          {isPending && <h2>Loading...</h2>}
          {isError && <h2>There was an error while loading the recording list</h2>}
        </Header>
      )}
      <RecordingGrid>
        {recordings.map((recording) => (
          <RecordingTile key={recording.id} {...recording} />
        ))}
      </RecordingGrid>
    </Column>
  );
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.header`
  padding: 1rem;
  text-align: center;
`;

const RecordingGrid = styled.div`
  display: grid;
  gap: 2rem;
  padding-bottom: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 500px) {
    padding: 2rem;
  }

  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default RecordingList;

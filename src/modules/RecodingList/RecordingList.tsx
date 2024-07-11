import styled from 'styled-components';

import { useRecordingsQuery } from 'api/hooks';
import RecordingTile from 'components/RecordingTile';

const RecordingList = () => {
  const { data } = useRecordingsQuery();

  console.log({ data });

  return (
    <Column>
      <Row>
        {recordings.map((recording) => (
          <RecordingTile key={recording.id} {...recording} />
        ))}
      </Row>
    </Column>
  );
};

const recordings = [
  {
    id: 1,
    name: 'Andipatola',
    duration: 100,
    date: '2024-06-11',
    speakers: ['Katrila', 'Opi Fex'],
  },
  {
    id: 2,
    name: 'Antykornik',
    duration: 200,
    date: '2011-06-11',
    speakers: ['Katrila', 'Kornik'],
  },
  {
    id: 3,
    name: 'Meeting',
    duration: 300,
    date: '2020-07-11',
    speakers: ['Katrila', 'Opi Fex', 'Benek', 'Buki'],
  },
  {
    id: 4,
    name: 'Moja sytuacja',
    duration: 400,
    date: '2020-07-11',
    speakers: ['Katrila', 'Opi Fex', 'Benek', 'Buki'],
  },
  {
    id: 5,
    name: 'Open Battle',
    duration: 6131,
    date: '2020-07-11',
    speakers: ['Katrila', 'Opi Fex', 'Benek', 'Buki'],
  },
];

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export default RecordingList;

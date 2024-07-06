import RecordingTile from './RecordingTile';

const RecordingList = () => {
  return (
    <>
      <h2>Hello There Lovelies</h2>
      {recordings.map((recording) => (
        <RecordingTile key={recording} id={recording.toString()} />
      ))}
    </>
  );
};

const recordings = Array(15)
  .fill(0)
  .map((_, index) => index);

export default RecordingList;

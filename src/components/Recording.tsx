import { useParams } from 'react-router-dom';

const Recording = () => {
  const params = useParams();

  return (
    <>
      <h2>I am king!</h2>
      <h3>{params.recordingId}</h3>
    </>
  );
};

export default Recording;

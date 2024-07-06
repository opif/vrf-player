interface Props {
  id: string;
}

const RecordingTile = ({ id }: Props) => (
  <div>
    <a href={`/${id}`}>Click Me! {id}</a>
  </div>
);

export default RecordingTile;

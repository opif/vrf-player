import { PauseIcon, PlayIcon, StopIcon } from 'assets/icons';
import styled from 'styled-components';

interface Props {
  max?: number;
  value?: number;
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

const PlayerUI = ({ max, value, playing, onPlay, onPause, onStop }: Props) => {
  //

  return (
    <ButtonColumn>
      {max && <progress max={max} value={value} />}
      <ButtonRow>
        {playing ? (
          <PushButton onClick={onPause}>
            <PauseIcon size={48} />
          </PushButton>
        ) : (
          <PushButton onClick={onPlay}>
            <PlayIcon size={48} />
          </PushButton>
        )}
        <PushButton onClick={onStop}>
          <StopIcon size={48} />
        </PushButton>
      </ButtonRow>
    </ButtonColumn>
  );
};

const ButtonRow = styled.div`
  display: flex;
  /* border: 1px solid green; */
  /* border-radius: 5px; */
  gap: 0.5em;
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const PushButton = styled.button`
  width: 64px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;

  & > svg {
    transform: scale(75%);
    transition: transform 200ms;
  }

  &:hover > svg {
    transform: scale(100%);
  }
`;

export default PlayerUI;

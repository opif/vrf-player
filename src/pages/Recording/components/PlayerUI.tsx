import { NextIcon, PauseIcon, PlayIcon, PrevIcon, StopIcon } from 'assets/icons';
import { formatDuration } from 'common/utils';
import styled from 'styled-components';

interface Props {
  duration?: number;
  position?: number;
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const PlayerUI = ({ duration, position, playing, ...rest }: Props) => {
  const { onPlay, onPause, onStop, onNext, onPrev } = rest;

  return (
    <ControlColumn>
      {duration && (
        <ButtonRow>
          <ProgressBar max={duration} value={position} />
          {position !== undefined && (
            <TimestampRow>
              {formatDuration(position)} / {formatDuration(duration)}
            </TimestampRow>
          )}
        </ButtonRow>
      )}
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
        {onPrev && (
          <PushButton onClick={onPrev}>
            <PrevIcon size={48} />
          </PushButton>
        )}
        {onNext && (
          <PushButton onClick={onNext}>
            <NextIcon size={48} />
          </PushButton>
        )}
        {onStop && (
          <PushButton onClick={onStop}>
            <StopIcon size={48} />
          </PushButton>
        )}
      </ButtonRow>
    </ControlColumn>
  );
};

const TimestampRow = styled.span`
  white-space: nowrap;
  flex-shrink: 0;
`;

const ProgressBar = styled.progress`
  width: 100%;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  gap: 0.5em;
`;

const ControlColumn = styled.div`
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

export { PlayerUI };

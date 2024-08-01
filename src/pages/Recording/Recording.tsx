import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ServerId } from 'api/types';
import { getVrfPath } from 'common/utils';
import { MediaPlayer } from 'modules/MediaPlayer';
import { PlayerStatus } from 'modules/MediaPlayer/MediaPlayer';

import { PlayerUI } from './components/PlayerUI';
import { SpeakerList } from './components/SpeakerList';
import { useRecordingQuery } from './queries';

const Recording = () => {
  const params = useParams();
  const { data } = useRecordingQuery(params.recordingId as ServerId);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activity, setActivity] = useState<Set<number>>();
  const mediaPlayerRef = useRef<MediaPlayer>();

  const handleProgress = (time: number) => {
    setProgress(time);
  };

  const handleActivityChange = (segmentId: Iterable<number>) => {
    const newSet = new Set(segmentId);

    setActivity(newSet);
  };

  const handlePlay = () => {
    mediaPlayerRef.current?.play();
  };

  const handlePause = () => {
    mediaPlayerRef.current?.pause();
  };

  const handleStop = () => {
    mediaPlayerRef.current?.reset();
  };

  const handleNext = () => {
    mediaPlayerRef.current?.skip(1);
  };

  const handlePrev = () => {
    mediaPlayerRef.current?.skip(-1);
  };

  const handleStatusChange = (status: PlayerStatus) => {
    if (status === 'playing') {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (!data?.segments) {
      return;
    }

    const mediaPlayer = new MediaPlayer(getVrfPath(data.hash), data.segments);
    mediaPlayer.on({ name: 'progress', callback: handleProgress });
    mediaPlayer.on({ name: 'activityChange', callback: handleActivityChange });
    mediaPlayer.on({ name: 'statusChange', callback: handleStatusChange });

    mediaPlayerRef.current = mediaPlayer;

    return () => {
      mediaPlayerRef.current?.off();
      mediaPlayerRef.current?.reset();
    };
  }, [data]);

  return (
    <Column>
      <InfoWrapper>
        <StyledFilename>{data?.filename}</StyledFilename>
        <RecordingDetails>
          <summary>Szczegóły nagrania ⓘ</summary>
          <span>{data?.recordedAt}</span>
          <span>Nagrywający: {data?.recordedBy}</span>
          <span>Vent: {data?.version}</span>
          <span>{data?.platform}</span>
          <span>{data?.codecDescription}</span>
        </RecordingDetails>
      </InfoWrapper>

      <PlayerUI
        position={progress}
        duration={data?.duration}
        playing={playing}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      {data?.segments && <SpeakerList segments={data.segments} activeSet={activity} />}
    </Column>
  );
};

const Column = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledFilename = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  word-break: break-all;
`;

const RecordingDetails = styled.details`
  margin: 0;
  display: flex;
  padding: 0.25rem 1rem;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;

  & summary {
    cursor: pointer;
  }

  &[open] summary {
    border-bottom: 1px solid #eee;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

export default Recording;

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ServerId } from 'api/types';
import { getVrfPath } from 'common/utils';
import { PlayerUI } from 'components/PlayerUI';
import { SegmentList } from 'components/SegmentList';
import { MediaPlayer } from 'modules/MediaPlayer';
import { PlayerStatus } from 'modules/MediaPlayer/MediaPlayer';

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
      <h2>{data?.filename}</h2>
      <span>{data?.recordedBy}</span>
      <span>{data?.duration}</span>
      <span>{data?.version}</span>
      <span>{data?.platform}</span>
      <span>{data?.codecDescription}</span>
      <span>{data?.recordedAt}</span>

      <PlayerUI
        value={progress}
        max={data?.duration}
        playing={playing}
        onPlay={handlePlay}
        onPause={handlePause}
        onStop={handleStop}
      />
      {data?.segments && <SegmentList segments={data.segments} activeSet={activity} />}
    </Column>
  );
};

const Column = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2em;
`;

export default Recording;

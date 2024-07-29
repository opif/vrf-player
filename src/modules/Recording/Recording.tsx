import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ServerId } from 'api/types';
import PlayerUI from 'components/PlayerUI';
import SegmentList from 'components/SegmentList';
import { useRecordingQuery } from './queries';
import { MediaPlayer } from 'modules/MediaPlayer';

const Recording = () => {
  const params = useParams();
  const { data } = useRecordingQuery(params.recordingId as ServerId);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activity, setActivity] = useState<Set<number>>();

  const handleProgress = (time: number) => {
    setProgress(time);
  };

  const handleActivityChange = (segmentId: number[]) => {
    const newSet = new Set<number>();

    segmentId.forEach((id) => newSet.add(id));
    setActivity(newSet);
  };

  const handlePlay = () => {
    setPlaying(true);

    mediaPlayer?.play();
  };

  const handlePause = () => {
    setPlaying(false);

    mediaPlayer?.pause();
  };

  const handleStop = () => {
    setPlaying(false);

    mediaPlayer?.reset();
  };

  const mediaPlayer = useMemo(() => {
    if (!data?.segments) {
      return null;
    }
    const mediaPlayer = new MediaPlayer('/MP3', data.segments);
    mediaPlayer.on({ name: 'progress', callback: handleProgress });
    mediaPlayer.on({ name: 'activityChange', callback: handleActivityChange });

    return mediaPlayer;
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
      {data?.segments && <SegmentList segments={data.segments} active={activity} />}
    </Column>
  );
};

const Column = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2em;
`;

export default Recording;

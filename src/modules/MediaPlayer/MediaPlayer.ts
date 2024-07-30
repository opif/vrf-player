import { Howl } from 'howler';

import { Segment } from 'api/types';

interface Sound {
  time: number;
  duration: number;
  filename: string;
}

interface PlayerCallbacks {
  onProgress: Set<(time: number) => void>;
  onActivityChange: Set<(soundIds: Iterable<number>) => void>;
  onStatusChange: Set<(status: PlayerStatus) => void>;
}

type ExtractSetArgument<T> = T extends Set<infer A> ? A : never;

type CallbackType =
  | { name: 'progress'; callback: ExtractSetArgument<PlayerCallbacks['onProgress']> }
  | {
      name: 'activityChange';
      callback: ExtractSetArgument<PlayerCallbacks['onActivityChange']>;
    }
  | {
      name: 'statusChange';
      callback: ExtractSetArgument<PlayerCallbacks['onStatusChange']>;
    };

export type PlayerStatus = 'playing' | 'paused' | 'stopped' | 'finished';

const MIN_BUFFER_SIZE = 3;
const MIN_BUFFER_TIME_MS = 10000;
const PROGRESS_UPDATE_TIMEOUT = 1000;

class MediaPlayer {
  private currentSounds = new Map<number, Howl>();
  private bufferedSounds = new Map<number, Howl>();
  private callbacks: PlayerCallbacks;
  private sourcePath: string;
  private pausedPosition = 0;
  private playbackStart = 0;
  private currentIndex = 0;
  private intervalId = -1;
  private timeoutId = -1;
  private sounds: Sound[];
  status: PlayerStatus;

  private buildSounds = (segments: Segment[]): Sound[] =>
    segments.map((segment) => ({
      time: segment.time,
      duration: segment.duration,
      filename: segment.filename + '.mp3',
    }));

  private initializeCallbacks = (): PlayerCallbacks => ({
    onProgress: new Set(),
    onActivityChange: new Set(),
    onStatusChange: new Set(),
  });

  private stopTimers = () => {
    if (this.timeoutId >= 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = -1;
    }

    if (this.intervalId >= 0) {
      clearInterval(this.intervalId);
      this.intervalId = -1;
    }
  };

  private getSoundPath = (name: string) => {
    return this.sourcePath + '/' + name;
  };

  private updateSoundBuffer = () => {
    let localIndex = this.currentIndex;
    let bufferSize = 0;
    let bufferTime = 0;

    while (
      localIndex < this.sounds.length &&
      (bufferSize < MIN_BUFFER_SIZE || bufferTime < MIN_BUFFER_TIME_MS)
    ) {
      const index = localIndex;
      const sound = this.sounds[index];

      if (!this.bufferedSounds.has(localIndex)) {
        const howl = new Howl({
          src: [this.getSoundPath(sound.filename)],
          preload: true,

          // turn it down!
          // volume: 0.35,
        });

        howl.on('end', () => {
          howl.unload();

          console.log({ index, status: 'end' });

          if (this.bufferedSounds.has(index)) {
            this.bufferedSounds.delete(index);
          }
          if (this.currentSounds.has(index)) {
            this.currentSounds.delete(index);
          }

          this.callbacks.onProgress.forEach((cb) => cb(sound.time + sound.duration));
          this.callbacks.onActivityChange.forEach((cb) => cb(this.currentSounds.keys()));
        });

        this.bufferedSounds.set(localIndex, howl);
      }

      bufferTime += sound.duration;
      bufferSize++;
      localIndex++;
    }
  };

  private prepareNextSound = () => {
    if (this.currentIndex >= this.sounds.length) {
      this.stopTimers();
      this.status = 'finished';
      this.callbacks.onStatusChange.forEach((cb) => cb(this.status));

      return;
    }

    const { time } = this.sounds[this.currentIndex];
    const timeout = Math.max(0, this.playbackStart + time - Date.now());
    this.updateSoundBuffer();

    this.timeoutId = setTimeout(() => {
      this.playNextSound();
    }, timeout);
  };

  private playNextSound = () => {
    const sound = this.bufferedSounds.get(this.currentIndex);
    if (sound) {
      this.bufferedSounds.delete(this.currentIndex);
      this.currentSounds.set(this.currentIndex, sound);

      this.callbacks.onActivityChange.forEach((cb) => cb(this.currentSounds.keys()));
      console.log({ current: this.currentSounds, buffered: this.bufferedSounds });

      sound.play();
    } else {
      console.error({ index: this.currentIndex, status: 'not found' });
    }

    this.currentIndex++;
    this.prepareNextSound();
  };

  constructor(vrfPath: string, segments: Segment[]) {
    this.sourcePath = vrfPath;
    this.sounds = this.buildSounds(segments);
    this.callbacks = this.initializeCallbacks();
    this.status = 'stopped';
  }

  on = (cbConfig: CallbackType) => {
    switch (cbConfig?.name) {
      case 'progress':
        this.callbacks.onProgress.add(cbConfig.callback);

        break;
      case 'activityChange':
        this.callbacks.onActivityChange.add(cbConfig.callback);

        break;
      case 'statusChange':
        this.callbacks.onStatusChange.add(cbConfig.callback);
        this.callbacks.onStatusChange.forEach((cb) => cb(this.status));

        break;
    }
  };

  off = (cbConfig?: CallbackType) => {
    if (cbConfig === undefined) {
      this.callbacks = this.initializeCallbacks();

      return;
    }

    switch (cbConfig.name) {
      case 'progress':
        this.callbacks.onProgress.delete(cbConfig.callback);

        break;

      case 'activityChange':
        this.callbacks.onActivityChange.delete(cbConfig.callback);

        break;
      case 'statusChange':
        this.callbacks.onStatusChange.delete(cbConfig.callback);

        break;
    }
  };

  skip = (howMany: number) => {
    this.currentIndex += howMany - 1;
    const sound = this.sounds[this.currentIndex];

    if (sound) {
      if (this.timeoutId >= 0) {
        clearTimeout(this.timeoutId);
        this.timeoutId = -1;
      }

      this.playbackStart = Date.now() - sound.time;
      this.prepareNextSound();
    }
  };

  play = () => {
    for (const sound of this.currentSounds.values()) {
      sound.play();
    }

    this.playbackStart =
      this.pausedPosition === 0 ? Date.now() : Date.now() - this.pausedPosition;
    this.prepareNextSound();

    this.status = 'playing';
    this.callbacks.onStatusChange.forEach((cb) => cb(this.status));

    this.intervalId = setInterval(() => {
      const progress = Math.max(0, Date.now() - this.playbackStart);

      this.callbacks.onProgress.forEach((cb) => cb(progress));
    }, PROGRESS_UPDATE_TIMEOUT);
  };

  pause = () => {
    for (const sound of this.currentSounds.values()) {
      sound.pause();
    }

    this.stopTimers();
    this.pausedPosition = Math.max(0, Date.now() - this.playbackStart);

    this.status = 'paused';
    this.callbacks.onStatusChange.forEach((cb) => cb(this.status));
  };

  reset = () => {
    for (const sound of this.currentSounds.values()) {
      sound.unload();
    }
    for (const sound of this.bufferedSounds.values()) {
      sound.unload();
    }
    this.currentSounds.clear();
    this.bufferedSounds.clear();
    this.currentIndex = 0;
    this.playbackStart = 0;
    this.pausedPosition = 0;

    this.status = 'stopped';
    this.callbacks.onProgress.forEach((cb) => cb(0));
    this.callbacks.onActivityChange.forEach((cb) => cb([]));
    this.callbacks.onStatusChange.forEach((cb) => cb(this.status));

    this.stopTimers();
  };
}

export default MediaPlayer;

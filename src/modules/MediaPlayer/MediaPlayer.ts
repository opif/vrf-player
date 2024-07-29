import { Howl } from 'howler';

import { Segment } from 'api/types';

interface Sound {
  time: number;
  duration: number;
  filename: string;
}

interface PlayerCallbacks {
  onProgress?: (time: number) => void;
  onActivityChange?: (soundIds: number[]) => void;
}

type CallbackType =
  | { name: 'progress'; callback: PlayerCallbacks['onProgress'] }
  | { name: 'activityChange'; callback: PlayerCallbacks['onActivityChange'] };

const MIN_BUFFER_SIZE = 3;
const MIN_BUFFER_TIME_MS = 10000;

class MediaPlayer {
  private currentSounds = new Map<number, Howl>();
  private bufferedSounds = new Map<number, Howl>();
  private callbacks: PlayerCallbacks = {};
  private sourcePath: string;
  private pausedPosition = 0;
  private playbackStart = 0;
  private currentIndex = 0;
  private timeoutId = -1;
  private sounds: Sound[];

  private buildSounds = (segments: Segment[]): Sound[] =>
    segments.map((segment) => ({
      time: segment.time,
      duration: segment.duration,
      filename: segment.filename + '.mp3',
    }));

  private getSoundPath = (name: string) => {
    return this.sourcePath + '/' + name;
  };

  private updateSoundBuffer = () => {
    let localIndex = this.currentIndex;
    let bufferSize = 0;
    let bufferTime = 0;

    while (bufferSize < MIN_BUFFER_SIZE || bufferTime < MIN_BUFFER_TIME_MS) {
      const index = localIndex;
      const sound = this.sounds[index];

      if (!this.bufferedSounds.has(localIndex)) {
        const howl = new Howl({
          src: [this.getSoundPath(sound.filename)],
          preload: true,

          // turn it down!
          volume: 0.35,
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

          this.callbacks.onProgress?.(sound.time + sound.duration);
          this.callbacks.onActivityChange?.(Array.from(this.currentSounds.keys()));
        });

        this.bufferedSounds.set(localIndex, howl);
      }

      bufferTime += sound.duration;
      bufferSize++;
      localIndex++;
    }
  };

  private prepareNextSound = () => {
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

      this.callbacks.onActivityChange?.(Array.from(this.currentSounds.keys()));
      console.log({ current: this.currentSounds });

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
  }

  on = (cbConfig: CallbackType) => {
    switch (cbConfig?.name) {
      case 'progress':
        this.callbacks.onProgress = cbConfig.callback;

        break;
      case 'activityChange':
        this.callbacks.onActivityChange = cbConfig.callback;

        break;
    }
  };

  off = () => {};

  play = () => {
    for (const sound of this.currentSounds.values()) {
      sound.play();
    }

    this.playbackStart =
      this.pausedPosition === 0 ? Date.now() : Date.now() - this.pausedPosition;
    this.prepareNextSound();
  };

  pause = () => {
    for (const sound of this.currentSounds.values()) {
      sound.pause();
    }

    if (this.timeoutId >= 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = -1;
    }

    this.pausedPosition = Math.max(0, Date.now() - this.playbackStart);
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

    this.callbacks.onProgress?.(0);
    this.callbacks.onActivityChange?.([]);

    if (this.timeoutId >= 0) {
      clearTimeout(this.timeoutId);
      this.timeoutId = -1;
    }
  };
}

export default MediaPlayer;

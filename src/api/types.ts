export type URLParams = Record<string, string | number | undefined>;

export type ListResult<T> = {
  list: T[];
};

export type ServerId = string & {
  __brand: 'ServerId';
};

export type ServerTimestamp = string & {
  __brand: 'ServerTimestamp';
};

export interface Segment {
  id?: ServerId;
  time: string | number;
  duration: string | number;
  username: string;
  filename: string;
  segmentSize: string | number;
  rate: string | number;
  channelCount: string | number;
}

export interface Recording {
  id?: ServerId;
  filename: string;
  recDate: ServerTimestamp | null;
  segCount?: string | number;
  recUsername: string;
  size: number;
  codec: string | number;
  codecformat: string | number;
  comment: string;
  copyright: string;
  platform: string;
  version: string;
  url: string;
  duration?: number;
  speakerCount?: number;
  segments?: Segment[];
}

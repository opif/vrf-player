export type URLParams = Record<string, string | number | undefined>;

export type ListResult<T> = {
  list: T[];
};

export type ID = string & {
  __brand: 'ID';
};

export interface Segment {
  id?: ID;
  time: string | number;
  duration: string | number;
  username: string;
  filename: string;
  segmentSize: string | number;
  rate: string | number;
  channelCount: string | number;
}

export interface Recording {
  id?: ID;
  filename: string;
  recDate: string;
  segCount?: string | number;
  recUsername: string;
  size: string | number;
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

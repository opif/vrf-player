export type URLParams = Record<string, string | number | undefined>;

export type ListResult<T> = {
  values: T[];
};

export type ServerId = string & {
  __brand: 'ServerId';
};

export type ServerTimestamp = string & {
  __brand: 'ServerTimestamp';
};

interface DatabaseEntity {
  id: ServerId;
  createdAt?: ServerTimestamp;
  modifiedAt?: ServerTimestamp;
}

export interface Segment extends DatabaseEntity {
  time: number;
  duration: number;
  username: string;
  filename: string;
  segmentOrder: number;
}

export interface Recording extends DatabaseEntity {
  filename: string;
  recordedBy: string;
  recordedAt: ServerTimestamp | null;
  codecDescription: string;
  platform: string;
  version: string;
  size: number;
  duration: number;
  speakerCount: number;
  hash: string;
  segments?: Segment[];
}

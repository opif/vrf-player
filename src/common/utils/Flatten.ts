export type Flatten<T> = T extends Record<string, infer V> ? Flatten<V> : T;

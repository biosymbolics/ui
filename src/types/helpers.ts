/**
 * Type helper for requiring a set of props to all be present, OR all be absent.
 */
export type AllOrNothing<T> =
    | { string: undefined }
    | { [K in keyof T]: Exclude<T[K], undefined> };

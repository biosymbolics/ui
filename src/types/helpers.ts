/**
 * Type helper for requiring a set of props to all be present, OR all be absent.
 */
export type AllOrNothing<T> =
    | { [K in keyof T]: undefined }
    | { [K in keyof T]: Exclude<T[K], undefined> }

export type AsyncFunction<A, O> = (...args: A[]) => Promise<O>

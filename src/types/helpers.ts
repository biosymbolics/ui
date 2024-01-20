/**
 * Type helper for requiring a set of props to all be present, OR all be absent.
 */
export type AllOrNothing<T> =
    | { string: undefined }
    | { [K in keyof T]: Exclude<T[K], undefined> };

/**
 * Equiv of typeof keyof T but for object values instead of keys
 */
export type ValueOf<T> = T[keyof T];

/**
 * Exclusive OR type helper
 */
export type XOR<T1, T2> =
    | (T1 & { [k in Exclude<keyof T2, keyof T1>]?: never })
    | (T2 & { [k in Exclude<keyof T1, keyof T2>]?: never });

/**
 * Checks if a key is a key of an object
 */
export const isKeyOfObject = <T extends Record<string, unknown>>(
    obj: T,
    key: string | number | symbol
): key is keyof T => key in obj;

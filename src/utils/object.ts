/**
 * Recursively format object keys
 * (Intended for use when converting from snake_case to camelCase, on objects returned from pythonland)
 * @param obj
 * @param formatter
 * @returns obj
 */
export const formatKeys = <T>(
    obj: T,
    formatter: (key: string) => string
): T => {
    if (!obj) {
        return null as T;
    }
    if (Array.isArray(obj)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return obj.map((item) => formatKeys(item, formatter)) as T;
    }
    if (typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj as Record<string, unknown>).map(
                ([key, value]) => [formatter(key), formatKeys(value, formatter)]
            )
        ) as T;
    }
    return obj;
};

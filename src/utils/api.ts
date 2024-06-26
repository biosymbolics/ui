import isBoolean from 'lodash/fp/isBoolean';
import isEmpty from 'lodash/fp/isEmpty';
import isNumber from 'lodash/fp/isNumber';
import snakeCase from 'lodash/fp/snakeCase';

/**
 * Optionally snake-case the key
 * @param key
 * @param isSnakeCase
 * @returns a key, maybe snake-cased
 */
const maybeSnakeCase = (key: string, isSnakeCase: boolean): string =>
    isSnakeCase ? snakeCase(key) : key;

/**
 * Format the value for the query string
 * @param value
 * @param isServer
 * @returns a string or number
 */
const formatValue = (
    value: unknown,
    isServer: boolean = false
): string | number => {
    if (Array.isArray(value)) {
        if (isServer) {
            return value.join('%3B'); // escaped ';'
        }
        return value.join(';');
    }
    if (isBoolean(value)) {
        return value ? 'true' : 'false';
    }
    if (isNumber(value)) {
        return value;
    }
    return value as string;
};

/**
 * Get the query string for the document search
 *
 * @param args - The arguments for the document search
 * @param isServer - Whether the query string is for the server (if so, snake_case keys)
 */
export const getQueryArgs = (
    args: Record<string, unknown>,
    isServer: boolean = false
): string => {
    const queryParams = Object.entries(args)
        .filter(
            ([, value]) =>
                !isEmpty(value) || isNumber(value) || isBoolean(value)
        )
        .map(
            ([key, value]) =>
                `${maybeSnakeCase(key, isServer)}=${formatValue(
                    value,
                    isServer
                )}`
        );

    return queryParams.join('&');
};

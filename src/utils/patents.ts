import isBoolean from 'lodash/fp/isBoolean';
import isEmpty from 'lodash/fp/isEmpty';
import isNumber from 'lodash/fp/isNumber';
import snakeCase from 'lodash/fp/snakeCase';

import { PatentSearchArgs } from '@/types/patents';

const maybeSnakeCase = (key: string, isSnakeCase: boolean): string =>
    isSnakeCase ? snakeCase(key) : key;

const formatValue = (value: unknown): string | number => {
    if (Array.isArray(value)) {
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
 * Get the query string for the patent search
 *
 * @param args - The arguments for the patent search
 * @param isServer - Whether the query string is for the server (if so, snake_case keys)
 */
export const getQueryArgs = (
    args: PatentSearchArgs,
    isServer: boolean = false
): string => {
    const queryParams = Object.entries(args)
        .filter(
            ([, value]) =>
                !isEmpty(value) || isNumber(value) || isBoolean(value)
        )
        .map(
            ([key, value]) =>
                `${maybeSnakeCase(key, isServer)}=${formatValue(value)}`
        );

    return queryParams.join('&');
};

import isEmpty from 'lodash/fp/isEmpty';
import isNumber from 'lodash/fp/isNumber';
import snakeCase from 'lodash/fp/snakeCase';

import { PatentSearchArgs } from '@/types/patents';

const maybeSnakeCase = (key: string, isSnakeCase: boolean): string =>
    isSnakeCase ? snakeCase(key) : key;

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
        .filter(([, value]) => !isEmpty(value) || isNumber(value))
        .map(
            ([key, value]) =>
                `${maybeSnakeCase(key, isServer)}=${
                    Array.isArray(value) ? value.join(';') : value
                }`
        );

    return queryParams.join('&');
};

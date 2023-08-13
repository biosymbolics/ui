import snakeCase from 'lodash/fp/snakeCase';

import { PatentSearchArgs } from '@/types/patents';

const maybeSnakeCase = (key: string, isSnakeCase: boolean): string =>
    isSnakeCase ? snakeCase(key) : key;

/**
 * Get the query string for the patent search
 */
export const getQueryArgs = (
    args: PatentSearchArgs,
    isSnakeCase: boolean = false
): string => {
    const queryParams = Object.entries(args).map(
        ([key, value]) =>
            `${maybeSnakeCase(key, isSnakeCase)}=${
                Array.isArray(value) ? value.join(',') : value
            }`
    );

    return queryParams.join('&');
};

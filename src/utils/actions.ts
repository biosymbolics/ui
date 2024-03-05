'use server';

import camelCase from 'lodash/fp/camelCase';
import { z } from 'zod';

import { formatKeys } from './object';

/**
 * Get fetch options, given a url and a schema
 * @param url
 * @param Schema
 * @returns
 */
export const doFetch = async <T>(
    url: string,
    schema: z.ZodSchema<T>,
    transform: (data: unknown) => unknown = (response) =>
        formatKeys(response, camelCase)
): Promise<T> => {
    console.info(`Calling url: ${url}`);

    const res = await fetch(url);
    if (!res.ok) {
        const error = await res.text();
        console.error('Failed to fetch: ', error);
        throw new Error(error);
    }

    const jsonResp: unknown = await res.json();
    const transformed = transform(jsonResp);

    const parsedRes = schema.safeParse(transformed);

    if (parsedRes.success === false) {
        const message = `Failed to parse: ${parsedRes.error.toString()}`;
        console.error(message, jsonResp);
        throw new Error(message);
    }

    return parsedRes.data;
};

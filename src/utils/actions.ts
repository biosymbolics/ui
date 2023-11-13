'use server';

import { z } from 'zod';

/**
 * Get fetch options, given a url and a schema
 * @param url
 * @param Schema
 * @returns
 */
export const doFetch = async <T>(
    url: string,
    schema: z.ZodSchema<T>
): Promise<T> => {
    console.info(`Calling url: ${url}`);

    const res = await fetch(url);
    if (!res.ok) {
        const error = await res.text();
        console.error('Failed to fetch: ', error);
        throw new Error(error);
    }

    const jsonResp: unknown = await res.json();
    const parsedRes = schema.safeParse(jsonResp);

    if (parsedRes.success === false) {
        const message = `Failed to parse: ${parsedRes.error.toString()}`;
        console.error(message);
        throw new Error(message);
    }

    return parsedRes.data;
};

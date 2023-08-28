'use server';

import { z } from 'zod';

/**
 * Get fetch options, given a url and a schema
 * @param url
 * @param Schema
 * @returns
 */
export const getFetchOptions = async <T>(
    url: string,
    schema: z.ZodSchema<T>
): Promise<T> => {
    console.debug(`Calling url: ${url}`);

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
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

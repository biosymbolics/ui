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
    'use server';

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(
            `Failed to fetch patent terms: ${res.status} ${res.statusText}`
        );
    }

    const jsonResp: unknown = await res.json();
    const parsedRes = schema.safeParse(jsonResp);

    if (parsedRes.success === false) {
        console.error(
            `Failed to parse: ${
                jsonResp as string
            } (type ${typeof jsonResp}), error: ${parsedRes.error.toString()}`
        );
        throw new Error(`Failed to parse: ${parsedRes.error.toString()}`);
    }
    return parsedRes.data;
};

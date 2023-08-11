'use server'
import 'server-only'
import { z } from 'zod'

/**
 * Get fetch options, given a url and a schema
 * @param url
 * @param Schema
 * @returns
 */
export const getFetchOptions = async <T>(
    url: string,
    Schema: z.ZodSchema<T>
): Promise<T> => {
    'use server'
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(
            `Failed to fetch patent terms: ${res.status} ${res.statusText}`
        )
    }

    const json_resp = await res.json()
    const parsedRes = Schema.safeParse(json_resp)

    if (parsedRes.success === false) {
        throw new Error(`Failed to parse: ${parsedRes.error}`)
    }
    return parsedRes.data
}

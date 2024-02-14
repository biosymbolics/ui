/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const MappingObjectSchema = z.object({
    name: z.string(),
    canonical_name: z.union([z.string(), z.null()]),
    // instance_rollup: z.union([z.string(), z.null()]),
});

export type MappingObject = z.infer<typeof MappingObjectSchema>;

// turn ; delimited string into array
export const paramStringArray = z.preprocess((value) => {
    if (typeof value === 'string') {
        return value.split(';');
    }
    return value;
}, z.array(z.string()));

export const BaseSearchArgsSchema = z.object({
    endYear: z.optional(z.number()),
    queryType: z.optional(z.string()),
    startYear: z.optional(z.number()),
    terms: z.optional(
        z.union([paramStringArray, z.array(z.string()).nullable()])
    ),
});

export type BaseSearchArgs = z.infer<typeof BaseSearchArgsSchema>;

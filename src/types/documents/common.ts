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

export const paramInteger = z.preprocess((value) => {
    if (typeof value === 'string') {
        return parseInt(value, 10);
    }
    return value;
}, z.number());

export const paramString = z.preprocess((value) => {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return `${value}`;
    }
    if (typeof value === 'boolean') {
        return value ? 'true' : 'false';
    }
    if (Array.isArray(value)) {
        return value.join(';');
    }
    if (value === null) {
        return '';
    }
    throw new Error('Invalid value');
}, z.string());

export const BaseSearchArgsSchema = z.object({
    endYear: z.optional(paramInteger),
    queryType: z.optional(z.string()),
    startYear: z.optional(paramInteger),
    terms: z.optional(
        z.union([paramStringArray, z.array(z.string()).nullable()])
    ),
});

export type BaseSearchArgs = z.infer<typeof BaseSearchArgsSchema>;

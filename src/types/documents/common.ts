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

export const SearchTypes = [
    'intervention',
    'indication',
    'target', // or drug class
    'company', // single company dossier
    'companies', // multiple company
] as const;
const SearchTypeSchema = z.enum(SearchTypes);
export type SearchType = z.infer<typeof SearchTypeSchema>;

export const BaseSearchArgsSchema = z.object({
    description: z.optional(z.string()),
    k: z.optional(paramInteger),
    endYear: z.optional(paramInteger),
    queryType: z.optional(z.string()),
    startYear: z.optional(paramInteger),
    terms: z.optional(
        z.union([paramStringArray, z.array(z.string()).nullable()])
    ),
    type: z.optional(SearchTypeSchema),
});

export type BaseSearchArgs = z.infer<typeof BaseSearchArgsSchema>;

import { z } from 'zod';

export const MappingObjectSchema = z.object({
    name: z.string(),
    canonicalName: z.union([z.string(), z.null()]),
});

export type MappingObject = z.infer<typeof MappingObjectSchema>;

/**
 * Turn a semicolon delimited string into an array of strings
 */
export const paramStringArray = z.preprocess((value) => {
    if (typeof value === 'string') {
        return value.split(';');
    }
    return value;
}, z.array(z.string()));

/**
 * Turn a string into an integer
 */
export const paramInteger = z.preprocess((value) => {
    if (typeof value === 'string') {
        return parseInt(value, 10);
    }
    return value;
}, z.number());

export const ViewTypes = [
    'intervention',
    'indication',
    'target', // or drug class
    'company', // single company dossier
    'companies', // multiple company
    'unknown',
] as const;
const ViewTypesSchema = z.enum(ViewTypes);
export type ViewType = z.infer<typeof ViewTypesSchema>;

export const BaseSearchArgsSchema = z.object({
    description: z.optional(z.string()),
    k: z.optional(paramInteger),
    endYear: z.optional(paramInteger),
    queryType: z.optional(z.string()),
    startYear: z.optional(paramInteger),
    terms: z.optional(
        z.union([paramStringArray, z.array(z.string()).nullable()])
    ),
    type: z.optional(ViewTypesSchema),
});

export type BaseSearchArgs = z.infer<typeof BaseSearchArgsSchema>;

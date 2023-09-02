/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const PATENT_DOMAINS = [
    'assignees',
    'attributes',
    'compounds',
    'diseases',
    // 'genes',
    'inventors',
    // 'ipc_codes',
    'mechanisms',
];

export const PatentSchema = z.object({
    publication_number: z.string(),
    title: z.string(),
    abstract: z.string(),
    adj_patent_years: z.number(),
    approval_date: z.union([z.string(), z.null()]),
    assignees: z.array(z.string()),
    attributes: z.array(z.string()),
    availability_score: z.number(),
    brand_name: z.union([z.string(), z.null()]),
    compounds: z.array(z.string()),
    diseases: z.array(z.string()),
    generic_name: z.union([z.string(), z.null()]),
    genes: z.array(z.string()),
    indication: z.union([z.string(), z.null()]),
    inventors: z.array(z.string()),
    ipc_codes: z.array(z.string()),
    is_approved: z.optional(z.boolean()),
    patent_years: z.number(),
    priority_date: z.string(),
    probability_of_success: z.number(),
    mechanisms: z.array(z.string()),
    score: z.number(),
    similar: z.array(z.string()),
    suitability_score: z.number(),
    suitability_score_explanation: z.optional(z.union([z.string(), z.null()])),
    url: z.string(),
});

const PatentSummarySchema = z.object({
    count: z.number(),
    x: z.union([z.string(), z.number()]),
    y: z.optional(z.union([z.string(), z.number()])),
});
export const PatentsSummarySchema = z.array(
    z.object({
        x: z.union([z.string(), z.number()]),
        y: z.optional(z.union([z.string(), z.number()])),
        data: z.array(PatentSummarySchema),
    })
);

export const PatentResponseSchema = z.array(PatentSchema);

export type PatentsSummaries = z.infer<typeof PatentsSummarySchema>;

export type Patent = z.infer<typeof PatentSchema>;
export type PatentResponse = z.infer<typeof PatentResponseSchema>;

export type PatentSearchArgs = {
    domains: string[] | null;
    isExhaustive: boolean;
    minPatentYears: number;
    terms: string[];
};

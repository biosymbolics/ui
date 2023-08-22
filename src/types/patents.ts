/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const PatentSchema = z.object({
    publication_number: z.string(),
    title: z.string(),
    abstract: z.string(),
    assignees: z.array(z.string()),
    compounds: z.array(z.string()),
    diseases: z.array(z.string()),
    genes: z.array(z.string()),
    inventors: z.array(z.string()),
    ipc_codes: z.array(z.string()),
    patent_years: z.number(),
    mechanisms: z.array(z.string()),
    score: z.number(),
    search_rank: z.number(),
    similar: z.array(z.string()),
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
    minPatentYears: number;
    relevancyThreshold: string;
    terms: string[];
};

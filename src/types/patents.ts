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

const PatentSummarySchema = z.object({ count: z.number(), term: z.string() });
const PatentsSummarySchema = z.array(
    z.object({
        column: z.string(),
        data: z.array(PatentSummarySchema),
    })
);

export const PatentResponseSchema = z.object({
    patents: z.array(PatentSchema),
    summaries: PatentsSummarySchema,
});

export type PatentsSummaries = z.infer<typeof PatentsSummarySchema>;

export type Patent = z.infer<typeof PatentSchema>;
export type PatentResponse = z.infer<typeof PatentResponseSchema>;

export type PatentSearchArgs = {
    minPatentYears: number;
    relevancyThreshold: string;
    terms: string[];
};

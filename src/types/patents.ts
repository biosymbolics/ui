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

export const PatentResponse = z.array(PatentSchema);

export type Patent = z.infer<typeof PatentSchema>;

export type PatentSearchArgs = {
    minPatentYears: number;
    relevancyThreshold: string;
    terms: string[];
};

/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const PatentSchema = z.object({
    publication_number: z.string(),
    title: z.string(),
    abstract: z.string(),
    adj_patent_years: z.number(),
    approval_dates: z.optional(z.array(z.string())),
    assignees: z.array(z.string()),
    attributes: z.array(z.string()),
    availability_score: z.number(),
    biologics: z.array(z.string()),
    brand_name: z.union([z.string(), z.null()]),
    compounds: z.array(z.string()),
    devices: z.array(z.string()),
    diseases: z.array(z.string()),
    generic_name: z.union([z.string(), z.null()]),
    // genes: z.array(z.string()),
    indications: z.optional(z.union([z.array(z.string()), z.null()])),
    inventors: z.array(z.string()),
    ipc_codes: z.array(z.string()),
    is_approved: z.optional(z.boolean()),
    last_trial_status: z.optional(z.union([z.string(), z.null()])),
    last_trial_update: z.optional(z.union([z.string(), z.null()])),
    max_trial_phase: z.optional(z.union([z.string(), z.null()])),
    nct_ids: z.union([z.null(), z.array(z.union([z.string(), z.null()]))]),
    patent_years: z.number(),
    priority_date: z.string(),
    probability_of_success: z.number(),
    mechanisms: z.array(z.string()),
    score: z.number(),
    search_rank: z.number(),
    similar_patents: z.array(z.string()),
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
    isExhaustive: boolean;
    minPatentYears: number;
    queryType: string | null;
    terms: string[] | null;
};

const PatentEdgeSchema = z.object({
    source: z.string(),
    target: z.string(),
});

const PatentNodeSchema = z.object({
    id: z.string(),
    group: z.string(),
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
    size: z.number(),
});

export const PatentGraphSchema = z.object({
    edges: z.array(PatentEdgeSchema),
    nodes: z.array(PatentNodeSchema),
});

export type PatentGraph = z.infer<typeof PatentGraphSchema>;
export type PatentEdge = z.infer<typeof PatentEdgeSchema>;
export type PatentNode = z.infer<typeof PatentNodeSchema>;

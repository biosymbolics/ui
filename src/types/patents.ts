/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

const MappingObject = z.object({
    name: z.string(),
    canonical_name: z.union([z.string(), z.null()]),
    instance_rollup: z.union([z.string(), z.null()]),
});

export const PatentSchema = z.object({
    id: z.string(),
    title: z.string(),
    abstract: z.string(),
    adj_patent_years: z.number(),
    assignees: z.union([z.array(MappingObject), z.null()]),
    attributes: z.array(z.string()),
    availability_likelihood: z.string(),
    availability_explanation: z.string(),
    indications: z.array(MappingObject),
    interventions: z.array(MappingObject),
    exemplar_similarity: z.union([z.number(), z.null()]),
    inventors: z.union([z.array(MappingObject), z.null()]),
    ipc_codes: z.array(z.string()),
    patent_years: z.number(),
    priority_date: z.string(),
    probability_of_success: z.number(),
    reformulation_score: z.optional(z.number()),
    score: z.number(),
    search_rank: z.union([z.number(), z.null()]),
    similar_patents: z.array(z.string()),
    suitability_score: z.number(),
    suitability_score_explanation: z.optional(z.union([z.string(), z.null()])),
    url: z.string(),
});

const PatentSummarySchema = z.object({
    count: z.number(),
    x: z.union([z.string(), z.number()]),
    y: z.optional(z.union([z.string(), z.number(), z.null()])),
});
export const PatentsSummarySchema = z.array(
    z.object({
        x: z.union([z.string(), z.number()]),
        y: z.optional(z.union([z.string(), z.number(), z.null()])),
        data: z.array(PatentSummarySchema),
    })
);

const PatentTopicSchema = z.object({
    publication_number: z.string(),
    x: z.union([z.string(), z.number()]),
    y: z.optional(z.union([z.string(), z.number()])),
});
export const PatentsTopicSchema = z.array(PatentTopicSchema);

export const PatentResponseSchema = z.array(PatentSchema);

export type PatentsSummaries = z.infer<typeof PatentsSummarySchema>;
export type PatentsTopics = z.infer<typeof PatentsTopicSchema>;
export type Patent = z.infer<typeof PatentSchema>;
export type PatentResponse = z.infer<typeof PatentResponseSchema>;

export type PatentSearchArgs = {
    exemplarPatents?: string[] | null;
    minPatentYears?: number | null;
    queryType?: string | null;
    terms: string[] | null;
};

const PatentEdgeSchema = z.object({
    source: z.string(),
    target: z.string(),
    weight: z.number(),
});

const PatentNodeSchema = z.object({
    id: z.string(),
    label: z.string(),
    group: z.string(),
    parent: z.optional(z.string()),
});

export const PatentGraphSchema = z.object({
    edges: z.array(PatentEdgeSchema),
    nodes: z.array(PatentNodeSchema),
});

export type PatentGraph = z.infer<typeof PatentGraphSchema>;
export type PatentEdge = z.infer<typeof PatentEdgeSchema>;
export type PatentNode = z.infer<typeof PatentNodeSchema>;

const HeadFieldEnum = z.enum([
    'publication_number',
    'assignee',
    'priority_year',
]);

export type HeadField = z.infer<typeof HeadFieldEnum>;

export const PatentCharacteristicsSchema = z.array(
    z.object({
        concept: z.string(),
        count: z.number(),
        head: z.string(),
        patents: z.array(z.string()),
    })
);

export type PatentCharacteristics = z.infer<typeof PatentCharacteristicsSchema>;

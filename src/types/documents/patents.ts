/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { BaseSearchArgsSchema, MappingObjectSchema } from './common';

export const PatentSchema = z.object({
    id: z.string(),
    title: z.string(),
    abstract: z.string(),
    adj_patent_years: z.number(),
    assignees: z.union([z.array(MappingObjectSchema), z.null()]),
    attributes: z.array(z.string()),
    availability_likelihood: z.string(),
    availability_explanation: z.string(),
    description_similarity: z.union([z.number(), z.null()]),
    indications: z.union([z.array(MappingObjectSchema), z.null()]),
    interventions: z.union([z.array(MappingObjectSchema), z.null()]),
    inventors: z.union([z.array(MappingObjectSchema), z.null()]),
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
export const PatentResponseSchema = z.array(PatentSchema);

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

export type PatentsSummaries = z.infer<typeof PatentsSummarySchema>;
export type PatentsTopics = z.infer<typeof PatentsTopicSchema>;
export type Patent = z.infer<typeof PatentSchema>;
export type PatentResponse = z.infer<typeof PatentResponseSchema>;

export const PatentSearchArgsSchema = BaseSearchArgsSchema.extend({
    description: z.optional(z.string()),
    k: z.optional(z.number()),
});

export type PatentSearchArgs = z.infer<typeof PatentSearchArgsSchema>;

export const PatentSearchArgsWithIdsSchema = PatentSearchArgsSchema.extend({
    ids: z.optional(z.array(z.string())),
});

export type PatentSearchArgsWithIds = z.infer<
    typeof PatentSearchArgsWithIdsSchema
>;

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

const HeadFieldEnum = z.enum(['id', 'assignee', 'priority_date']);
export type HeadField = z.infer<typeof HeadFieldEnum>;

const PatentCharacteristicSchema = z.object({
    concept: z.string(),
    count: z.number(),
    head: z.union([z.string(), z.number()]),
    documents: z.array(z.string()),
});
export const PatentCharacteristicsSchema = z.array(PatentCharacteristicSchema);
export type PatentCharacteristic = z.infer<typeof PatentCharacteristicSchema>;
export type PatentCharacteristics = z.infer<typeof PatentCharacteristicsSchema>;

const RelevanceByYearSchema = z.object({
    year: z.number(),
    relevance: z.number(),
});

export type RelevanceByYear = z.infer<typeof RelevanceByYearSchema>;

export const PotentialBuyerSchema = z.object({
    id: z.number(),
    name: z.string(),
    ids: z.array(z.string()),
    count: z.number(),
    symbol: z.optional(z.union([z.string(), z.null()])),
    titles: z.array(z.string()),
    // terms: z.array(z.string()),
    minAge: z.number(),
    avgAge: z.number(),
    maxRelevanceScore: z.number(),
    avgRelevanceScore: z.number(),
    activity: z.array(z.number()),
    relevanceByYear: z.array(RelevanceByYearSchema),
    score: z.number(),
});
export const PotentialBuyersSchema = z.array(PotentialBuyerSchema);
export type PotentialBuyers = z.infer<typeof PotentialBuyersSchema>;
export type PotentialBuyer = z.infer<typeof PotentialBuyerSchema>;

const FindBuyersParamsSchema = z.object({
    description: z.string(),
    useGptExpansion: z.optional(z.boolean()),
    k: z.optional(z.number()),
});
export type FindBuyersParams = z.infer<typeof FindBuyersParamsSchema>;

export const PotentialBuyerResponseSchema = z.object({
    buyers: PotentialBuyersSchema,
    description: z.string(),
});

export type PotentialBuyerResponse = z.infer<
    typeof PotentialBuyerResponseSchema
>;

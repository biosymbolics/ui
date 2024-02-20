/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import {
    BaseSearchArgsSchema,
    MappingObjectSchema,
    paramStringArray,
} from './common';

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

export const PatentSearchArgsSchema = BaseSearchArgsSchema;

export type PatentSearchArgs = z.infer<typeof PatentSearchArgsSchema>;

export const PatentSearchArgsWithIdsSchema = PatentSearchArgsSchema.extend({
    ids: z.optional(
        z.union([paramStringArray, z.array(z.string()).nullable()])
    ),
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

const HeadFieldEnum = z.enum(['interventions', 'indications', 'owners']);
export type HeadField = z.infer<typeof HeadFieldEnum>;

const TailFieldEnum = z.enum(['interventions', 'indications', 'owners']);
export type TailField = z.infer<typeof TailFieldEnum>;

const DocumentCharacteristicschema = z.object({
    count: z.number(),
    documents: z.array(z.string()),
    head: z.union([z.string(), z.number()]),
    tail: z.string(),
});
export const DocumentCharacteristicsSchema = z.array(
    DocumentCharacteristicschema
);
export type DocumentCharacteristic = z.infer<
    typeof DocumentCharacteristicschema
>;
export type DocumentCharacteristics = z.infer<
    typeof DocumentCharacteristicsSchema
>;

const CountByYearSchema = z.object({
    year: z.number(),
    count: z.number(),
});

export type RelevanceByYear = z.infer<typeof CountByYearSchema>;

export const CompanySchema = z.object({
    id: z.number(),
    name: z.string(),
    ids: z.array(z.string()),
    count: z.number(),
    symbol: z.optional(z.union([z.string(), z.null()])),
    titles: z.array(z.string()),
    // terms: z.array(z.string()),
    minAge: z.number(),
    avgAge: z.number(),
    relevanceScore: z.number(),
    wheelhouseScore: z.number(),
    activity: z.array(z.number()),
    countByYear: z.array(CountByYearSchema),
    score: z.number(),
});
export const CompaniesSchema = z.array(CompanySchema);
export type Company = z.infer<typeof CompanySchema>;

export const FindCompaniesParamsSchema = PatentSearchArgsSchema.extend({
    similarCompanies: z.optional(paramStringArray), // OR with description
});
export type FindCompaniesParams = z.infer<typeof FindCompaniesParamsSchema>;

export const CompanyResponseSchema = z.object({
    companies: CompaniesSchema,
    description: z.string(),
});
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>;

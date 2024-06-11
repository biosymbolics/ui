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
    abstract: z.union([z.null(), z.string()]),
    adjPatentYears: z.number({ coerce: true }),
    assignees: z.union([z.array(MappingObjectSchema), z.null()]),
    attributes: z.array(z.string()),
    availabilityLikelihood: z.string(),
    availabilityExplanation: z.string(),
    descriptionSimilarity: z.union([z.number(), z.null()]),
    indications: z.union([z.array(MappingObjectSchema), z.null()]),
    interventions: z.union([z.array(MappingObjectSchema), z.null()]),
    inventors: z.union([z.array(MappingObjectSchema), z.null()]),
    patentYears: z.number({ coerce: true }),
    priorityDate: z.string(),
    probabilityOfSuccess: z.number({ coerce: true }),
    score: z.number({ coerce: true }),
    searchRank: z.union([z.number(), z.null()]),
    similarPatents: z.array(z.string()),
    suitabilityScore: z.number({ coerce: true }),
    suitabilityScoreExplanation: z.optional(z.union([z.string(), z.null()])),
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
    publicationNumber: z.string(),
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
    count: z.number({ coerce: true }),
    type: z.string(),
});

export type RelevanceByYear = z.infer<typeof CountByYearSchema>;

const UrlDefSchema = z.object({
    title: z.string(),
    url: z.string(),
});

export const CompanySchema = z.object({
    id: z.number(),
    name: z.string(),
    ids: z.array(z.string()),
    isAcquirer: z.boolean({ coerce: true }),
    isCompetition: z.boolean({ coerce: true }),
    count: z.number(),
    symbol: z.optional(z.union([z.string(), z.null()])),
    titles: z.array(z.string()),
    urls: z.array(UrlDefSchema),
    minAge: z.union([z.null(), z.number()]),
    avgAge: z.number(),
    relevance: z.number({ coerce: true }),
    wheelhouseScore: z.number({ coerce: true }),
    activity: z.array(z.number({ coerce: true })),
    countByYear: z.record(z.string(), z.array(CountByYearSchema)),
    score: z.number({ coerce: true }),
});
export const CompaniesSchema = z.array(CompanySchema);
export type Company = z.infer<typeof CompanySchema>;

export const FindCompaniesArgsSchema = PatentSearchArgsSchema;
export type FindCompaniesArgs = z.infer<typeof FindCompaniesArgsSchema>;

export const CompanyResponseSchema = z.object({
    companies: CompaniesSchema,
    description: z.string(),
    exitScore: z.number({ coerce: true }),
    competitionScore: z.number({ coerce: true }),
});
export type CompanyResponse = z.infer<typeof CompanyResponseSchema>;

import { z } from 'zod';

import { BaseSearchArgs, ViewType } from './documents/common';

const EntityActivitySchema = z.object({
    year: z.number({ coerce: true }),
    patents: z.number({ coerce: true }),
    regulatoryApprovals: z.number({ coerce: true }),
    trials: z.number({ coerce: true }),
});

export const ChildEntitySchema = z.object({
    activity: z.array(z.number({ coerce: true })),
    averageTrialDropout: z.union([z.number(), z.null()]),
    averageTrialDuration: z.union([z.number(), z.null()]),
    averageTrialEnrollment: z.union([z.number(), z.null()]),
    detailedActivity: z.array(EntityActivitySchema),
    id: z.string(),
    investmentLevel: z.string(),
    isApproved: z.boolean({ coerce: true }),
    lastStatus: z.string(),
    lastUpdated: z.union([z.number(), z.null()]),
    maybeAvailableCount: z.number({ coerce: true }),
    maybeAvailableIds: z.array(z.string()),
    maxPhase: z.string(),
    name: z.string(),
    owners: z.array(z.string()),
    ownerCount: z.number({ coerce: true }),
    patentCount: z.number({ coerce: true }),
    patentIds: z.array(z.string()),
    percentTrialsStopped: z.union([z.number(), z.null()]),
    recordCount: z.number({ coerce: true }),
    regulatoryApprovalCount: z.number({ coerce: true }),
    regulatoryApprovalIds: z.array(z.string()),
    risk: z.optional(z.string().default('--')),
    trialCount: z.number({ coerce: true }),
    trialIds: z.array(z.string()),
});

export const EntitySchema = ChildEntitySchema.and(
    z.object({
        children: z.array(ChildEntitySchema),
        childCount: z.number({ coerce: true }),
    })
);

export const EntityResponseSchema = z.array(EntitySchema);

export type Entity = z.infer<typeof EntitySchema>;
export type EntityResponse = z.infer<typeof EntityResponseSchema>;
export type EntityActivity = z.infer<typeof EntityActivitySchema>;

export const EntityCategories = [
    'intervention',
    'indication',
    'owner',
] as const;
const EntityCategorySchema = z.enum(EntityCategories);
export type EntityCategory = z.infer<typeof EntityCategorySchema>;
export type EntitySearchArgs = BaseSearchArgs & {
    entityCategory: EntityCategory;
    view: ViewType;
};

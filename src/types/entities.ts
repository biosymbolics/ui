/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { BaseSearchArgs, ViewType } from './documents/common';

const EntityActivitySchema = z.object({
    year: z.number(),
    patents: z.number(),
    regulatory_approvals: z.number(),
    trials: z.number(),
});

export const ChildEntitySchema = z.object({
    activity: z.array(z.number()),
    average_trial_dropout: z.number(),
    average_trial_duration: z.number(),
    average_trial_enrollment: z.number(),
    detailed_activity: z.array(EntityActivitySchema),
    id: z.string(),
    investment_level: z.string(),
    is_approved: z.boolean(),
    last_status: z.string(),
    last_updated: z.union([z.number(), z.null()]),
    maybe_available_count: z.number(),
    maybe_available_ids: z.array(z.string()),
    max_phase: z.string(),
    name: z.string(),
    owners: z.array(z.string()),
    owner_count: z.number(),
    patent_count: z.number(),
    patent_ids: z.array(z.string()),
    percent_trials_stopped: z.number(),
    record_count: z.number(),
    regulatory_approval_count: z.number(),
    regulatory_approval_ids: z.array(z.string()),
    risk: z.optional(z.string().default('--')),
    trial_count: z.number(),
    trial_ids: z.array(z.string()),
});

export const EntitySchema = ChildEntitySchema.and(
    z.object({ children: z.array(ChildEntitySchema), child_count: z.number() })
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

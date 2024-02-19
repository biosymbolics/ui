/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { PatentSearchArgs } from './documents/patents';

const AssetActivitySchema = z.object({
    year: z.number(),
    patents: z.number(),
    regulatory_approvals: z.number(),
    trials: z.number(),
});

export const ChildAssetSchema = z.object({
    activity: z.array(z.number()),
    average_trial_dropout: z.number(),
    average_trial_duration: z.number(),
    average_trial_enrollment: z.number(),
    detailed_activity: z.array(AssetActivitySchema),
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
    trial_count: z.number(),
    trial_ids: z.array(z.string()),
});

export const AssetSchema = ChildAssetSchema.and(
    z.object({ children: z.array(ChildAssetSchema), child_count: z.number() })
);

export const AssetResponseSchema = z.array(AssetSchema);

export type Asset = z.infer<typeof AssetSchema>;
export type AssetResponse = z.infer<typeof AssetResponseSchema>;
export type AssetActivity = z.infer<typeof AssetActivitySchema>;

export type AssetSearchArgs = PatentSearchArgs;

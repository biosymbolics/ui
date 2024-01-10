/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { RegulatoryApprovalSchema } from './documents/approvals';
import { PatentSchema } from './documents/patents';
import { TrialSchema } from './documents/trials';

export const AssetSchema = z.object({
    activity: z.array(z.number()),
    approval_count: z.number(),
    investment_level: z.string(),
    is_approved: z.boolean(),
    last_status: z.string(),
    last_updated: z.union([z.number(), z.null()]),
    maybe_available_count: z.number(),
    max_phase: z.string(),
    name: z.string(),
    owners: z.array(z.string()),
    owner_count: z.number(),
    patents: z.array(PatentSchema),
    patent_count: z.number(),
    percent_stopped: z.number(),
    record_count: z.number(),
    regulatory_approvals: z.array(RegulatoryApprovalSchema),
    total_enrollment: z.number(),
    trials: z.array(TrialSchema),
    trial_count: z.number(),
});

export const AssetResponseSchema = z.array(AssetSchema);

export type Asset = z.infer<typeof AssetSchema>;
export type AssetResponse = z.infer<typeof AssetResponseSchema>;

export type AssetSearchArgs = {
    queryType?: string | null;
    terms: string[] | null;
};

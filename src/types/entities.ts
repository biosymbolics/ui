/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { RegulatoryApprovalSchema } from './approvals';
import { PatentSchema } from './patents';
import { TrialSchema } from './trials';

export const EntitySchema = z.object({
    activity: z.array(z.number()),
    approvals: z.array(RegulatoryApprovalSchema),
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
    total_enrollment: z.number(),
    trials: z.array(TrialSchema),
    trial_count: z.number(),
});

export const EntityResponseSchema = z.array(EntitySchema);

export type Entity = z.infer<typeof EntitySchema>;
export type EntityResponse = z.infer<typeof EntityResponseSchema>;

export type EntitySearchArgs = {
    queryType: string | null;
    terms: string[] | null;
};

/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const ChildAssetSchema = z.object({
    activity: z.array(z.number()),
    approval_count: z.number(),
    id: z.string(),
    enrollment: z.number(),
    investment_level: z.string(),
    is_approved: z.boolean(),
    last_status: z.string(),
    last_updated: z.union([z.number(), z.null()]),
    maybe_available_count: z.number(),
    max_phase: z.string(),
    name: z.string(),
    owners: z.array(z.string()),
    owner_count: z.number(),
    patent_count: z.number(),
    percent_stopped: z.number(),
    record_count: z.number(),
    trial_count: z.number(),
});

export const AssetSchema = ChildAssetSchema.and(
    z.object({ children: z.array(ChildAssetSchema), child_count: z.number() })
);

export const AssetResponseSchema = z.array(AssetSchema);

export type Asset = z.infer<typeof AssetSchema>;
export type AssetResponse = z.infer<typeof AssetResponseSchema>;

export type AssetSearchArgs = {
    queryType?: string | null;
    terms: string[] | null;
};

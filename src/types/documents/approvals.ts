/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { MappingObjectSchema } from './common';

export const RegulatoryApprovalSchema = z.object({
    agency: z.optional(z.string()),
    application_type: z.string(),
    approval_date: z.string(),
    id: z.string(),
    indications: z.union([z.array(MappingObjectSchema), z.null()]),
    interventions: z.union([z.array(MappingObjectSchema), z.null()]),
    url: z.string(),
});

export type RegulatoryApproval = z.infer<typeof RegulatoryApprovalSchema>;

export const RegulatoryApprovalResponseSchema = z.array(
    RegulatoryApprovalSchema
);

export type RegulatoryApprovalResponse = z.infer<
    typeof RegulatoryApprovalResponseSchema
>;

export type RegulatoryApprovalSearchArgs = {
    queryType?: string | null;
    terms: string[] | null;
};

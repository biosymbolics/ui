/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import {
    BaseSearchArgs,
    BaseSearchArgsSchema,
    MappingObjectSchema,
    paramStringArray,
} from './common';

export const RegulatoryApprovalSchema = z.object({
    agency: z.optional(z.string()),
    applicationType: z.string(),
    approvalDate: z.string(),
    id: z.string(),
    indications: z.union([z.array(MappingObjectSchema), z.null()]),
    interventions: z.union([z.array(MappingObjectSchema), z.null()]),
    url: z.string(),
});

export type RegulatoryApproval = z.infer<typeof RegulatoryApprovalSchema>;

export const RegulatoryApprovalSearchArgsSchema = BaseSearchArgsSchema;

export const RegulatoryApprovalSearchArgsWithIdsSchema =
    RegulatoryApprovalSearchArgsSchema.extend({
        ids: z.optional(
            z.union([paramStringArray, z.array(z.string()).nullable()])
        ),
    });

export const RegulatoryApprovalResponseSchema = z.array(
    RegulatoryApprovalSchema
);

export type RegulatoryApprovalResponse = z.infer<
    typeof RegulatoryApprovalResponseSchema
>;

export type RegulatoryApprovalSearchArgs = BaseSearchArgs;

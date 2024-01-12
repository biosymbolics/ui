/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { MappingObjectSchema } from './common';

export const RegulatoryApprovalSchema = z.object({
    agency: z.optional(z.string()),
    application_type: z.string(),
    approval_date: z.string(),
    id: z.string(),
    indications: z.array(MappingObjectSchema),
    interventions: z.array(MappingObjectSchema),
    url: z.string(),
});

export type RegulatoryApproval = z.infer<typeof RegulatoryApprovalSchema>;

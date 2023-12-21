/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const RegulatoryApprovalSchema = z.object({
    application_type: z.string(),
    approval_date: z.string(),
    active_ingredients: z.optional(z.array(z.string())),
    brand_name: z.string(),
    generic_name: z.string(),
    indications: z.array(z.string()),
    label_url: z.string(),
    pharmacologic_classes: z.array(z.string()),
    ndc_code: z.string(),
    regulatory_agency: z.optional(z.string()),
});

export type RegulatoryApproval = z.infer<typeof RegulatoryApprovalSchema>;

/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const ClindevResponseSchema = z.array(
    z.object({
        stage: z.string(),
        offset: z.number(),
        median_duration: z.number(),
        iqr: z.number(),
    })
);

export const DataHeatmapSchema = z.array(
    z.object({
        intervention: z.string(),
        reason: z.string(),
        count: z.number(),
    })
);

export type ClindevResponse = z.infer<typeof ClindevResponseSchema>;

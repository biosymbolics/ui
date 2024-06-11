import { z } from 'zod';

export const ClindevResponseSchema = z.array(
    z.object({
        stage: z.string(),
        offset: z.number(),
        medianDuration: z.number(),
        iqr: z.number(),
    })
);

export type ClindevResponse = z.infer<typeof ClindevResponseSchema>;

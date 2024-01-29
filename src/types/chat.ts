import { z } from 'zod';

// one off schema for mock chat data map
export const InterventionDropoutReportSchema = z.array(
    z.object({
        intervention: z.string(),
        reason: z.string(),
        count: z.number(),
    })
);

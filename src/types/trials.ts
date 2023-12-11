/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const TrialSchema = z.object({
    nct_id: z.string(),
    title: z.string(),
    enrollment: z.union([z.number(), z.null()]),
    status: z.string(),
    phase: z.string(),
    start_date: z.string(),
    end_date: z.union([z.string(), z.null()]),
    randomization: z.string(),
    design: z.string(),
    dropout_count: z.union([z.number(), z.null()]),
    hypothesis_type: z.union([z.string(), z.null()]),
    conditions: z.array(z.string()),
    interventions: z.array(z.string()),
    primary_outcomes: z.array(z.string()),
    time_frames: z.array(z.string()),
    duration: z.union([z.number(), z.null()]),
    blinding: z.string(),
    comparison_type: z.string(),
    max_timeframe: z.union([z.number(), z.null()]),
    sponsor: z.union([z.string(), z.null()]),
    sponsor_type: z.string(),
    termination_reason: z.union([z.string(), z.null()]),
    score: z.number(),
});

export const TrialResponseSchema = z.array(TrialSchema);

export type Trial = z.infer<typeof TrialSchema>;
export type TrialResponse = z.infer<typeof TrialResponseSchema>;

export type TrialSearchArgs = {
    queryType: string | null;
    terms: string[] | null;
};
